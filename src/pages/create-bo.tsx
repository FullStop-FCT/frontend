import  {Token } from '../types';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import UnauthorizedAcess from '../Components/UnauthorizedAccess';
import { Formik, Form, useField, FieldAttributes } from 'Formik'
import { TextField, Button} from "@material-ui/core";
import * as Yup from 'Yup';
import styles from './styles/bo-register.module.scss';
import { api } from '../../services/api';
import { useRouter } from 'next/router';
import Header from '../Components/Header';
import { useState } from 'react';


const MyTextField: React.FC<FieldAttributes<{}>> = ({ placeholder, type, ...props }) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField variant="outlined" type={type}
      size="small" placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} InputLabelProps={{
        className: styles.form

      }} />
  )
}

const validationSchema = Yup.object({
  username: Yup.string()
    .matches(/^(\S+$)/, "Não pode conter espaços")
    .min(5, "O nome da conta deve ter entre 5 a 15 caráteres.")
    .max(15, "O nome da conta deve ter entre 5 a 15 caráteres.")
});


export default function Register() {

    const token = Cookies.getJSON('token');
    const decoded_token: Token = jwt_decode(token);

    let user_role = decoded_token.role;

    
    if (user_role == 'USER' || user_role == 'BO')
        return (<div><UnauthorizedAcess/></div>)

    async function fetch(values) {

        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }

        return await api.post('backoffice/insert', values, config)
                        .then(response => console.log(response))
                        .catch(error => console.log(error));
    }


    const[role, setRole] = useState('ADMIN');
    const router = useRouter();

    return (
        <div className={styles.container}>

            <div className={styles.header}>
                <Header/>
            </div>

            <div className={styles.register}>
                
                <Formik initialValues={{
                    username: '',
                    password: '',
                    email: '',
                    role: '',
                }}
                validationSchema={validationSchema}

                onSubmit={async (values, { setSubmitting, resetForm }) => {

                    setSubmitting(true);

                    values.role = role;

                    fetch(values);

                    setSubmitting(false);

                    resetForm();

                    console.log(values);
                }}>

                {({ isSubmitting }) => (
                    <Form className={styles.form}  >
                    <MyTextField placeholder="Username" name="username" type="input" as={TextField} />
                    <br/>
                    <MyTextField placeholder="Password" name="password" type="input" as={TextField} />
                    <br/>
                    <MyTextField placeholder="Email" name="email" type="input" as={TextField} />
                    <br/>
                    <a>Role:</a>
                    <select name="role" onChange={e => setRole(e.target.value)}>
                        <option value="ADMIN">Admin</option>
                        <option value="BO">Back Office</option>
                    </select>

                    <div>
                        <Button disabled={isSubmitting} type="submit">Registar</Button>
                    </div>
                    </Form>
                )
                }
                
                </Formik>
            </div>
        </div>
    );
}