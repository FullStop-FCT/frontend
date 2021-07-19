import { Formik, Form, useField, FieldAttributes } from 'Formik';
import { TextField, Button } from "@material-ui/core";
import * as Yup from 'Yup';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';

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

export default function ReportForm() {
    
    return (
        <div className={styles.container}>
                
            <h1>Denúncia</h1>
            <Formik initialValues={{
                reason: '',
                description: ''
            }}
                validationSchema={validationSchema}
    
            onSubmit={async (values, { setSubmitting }) => {
    
                setSubmitting(true);

                //add function

                //useRouter para o perfil
    
                setSubmitting(false);
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
        </div>
    )
}