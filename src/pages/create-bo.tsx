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

    const token: Token = jwt_decode(Cookies.getJSON('token'))

    let role = token.role;

    if (role == 'USER' || role == 'BO')
        return (<div><UnauthorizedAcess/></div>)

    else {
        
        const[role, setRole] = useState('');
        const router = useRouter();

        return (
            <div className={styles.container}>

                <div className={styles.header}>
                    <Header/>
                </div>

                <div className={styles.register}>
                    <h1>Organização</h1>
                    <Formik initialValues={{
                        name: '',
                        username: '',
                        password: '',
                        email: '',
                        role: '',
                        org: false
                    }}
                    validationSchema={validationSchema}

                    onSubmit={async (values, { setSubmitting }) => {

                        setSubmitting(true);

                        values.role = role;

                        await api.post('users/insert', values
                            ).then(function (response) {
                            console.log(JSON.stringify(response.data));
                            })
                            .catch(function (error) {
                                console.log(error);
                            });

                        setSubmitting(false);

                        router.push("/bo-users")
                    }}>

                    {({ isSubmitting }) => (
                        <Form className={styles.form}  >
                        <MyTextField className={styles.input} placeholder="Nome da Organização" name="name" type="input" as={TextField} />
                        <br/>
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
                            <option value="USER">User</option>
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
}