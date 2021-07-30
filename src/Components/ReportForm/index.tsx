import { Formik, Form, useField, FieldAttributes } from 'formik';
import { TextField, Button } from "@material-ui/core";
import * as Yup from 'yup';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import { api } from '../../../services/api';
import jwt_decode from "jwt-decode";
import { Token, userProps } from '../../types';
import Cookies from 'js-cookie';
import { useState } from 'react';

const MyTextField: React.FC<FieldAttributes<{}>> = ({ type, placeholder, ...props }) => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return (
      <TextField variant="outlined" type={type}
        size="small" placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} />
    )
}

const Multiline: React.FC<FieldAttributes<{}>> = ({ type, placeholder, ...props }) => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return (
      <TextField rows={3} variant="outlined" multiline type={type}
        size="small" placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} className={styles.multiline} />
    )
  }

const validationSchema = Yup.object({
reason: Yup.string()
    .max(30, "O motivo deve ter no máximo 30 caráteres.")
    .required("Obrigatório"),
description: Yup.string()
});

export default function ReportForm(props) {
    let username = window.location.pathname.split('/')
    let user = username[2];
    const router = useRouter();
    const [showSuccess, setShow] = useState(false);

    async function fetcher(path: string): Promise<userProps> {
        const token: Token = Cookies.getJSON('token')
        let config = {
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type' : 'application/json'
          }
        }
        return await api.post(path, props.accused, config)
                .then(response => response.data);
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.container}>
                
            {!showSuccess ?
                
                    <>
                        <h1>Denúncia</h1>
                        <Formik initialValues={{
                            reason: '',
                            description: '',
                            accused: props.accused,
                            accuser: props.accuser
                        }}
                            validationSchema={validationSchema}

                            onSubmit={async (values, { setSubmitting }) => {
    
                            setSubmitting(true);
                
                            fetcher(`/users/report/${user}`);

                            fetch('/api/report', {
                                method: 'post',
                                body: JSON.stringify(values)
                            });

                            setSubmitting(false);

                            setShow(true);
                            
                            }}>
                
                
                        {({ isSubmitting }) => (
                            <Form className={styles.form}> 

                                <div className={styles.formtext}> 
                                    <MyTextField className={styles.input} placeholder="Motivo da denúncia" name="reason" type="input" as={TextField} />
                                    <br />
                                    <Multiline placeholder="Descrição da situação" name="description" type="input"
                                    as={Multiline} />
                                    <br />
                        
                                    <div>
                                        <Button disabled={isSubmitting} type="submit">Denunciar</Button>
                                    </div>
                                </div>

                            </Form>
                        )
                        }
                        </Formik>
                    </>
            :
            <div className={styles.formtext}>

                <h1>Denúncia enviada com sucesso.</h1>
                    
            </div>
            }
            </div>
        </div>
    )
}