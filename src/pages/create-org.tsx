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

    if (role == 'USER')
        return (<div><UnauthorizedAcess/></div>)

    else {
        
        const router = useRouter();

        return (
            <div className={styles.container}>

                <div className={styles.header}>
                    <Header/>
                </div>

                <div className={styles.register}>
                    <h1>Organização</h1>
                    <Formik initialValues={{
                        username: '',
                        name: '',
                        email: '',
                        password: '',
                        confirmation: '',
                        phoneNumber: '',
                        location: '',
                        org: true
                    }}
                    validationSchema={validationSchema}

                    onSubmit={async (values, { setSubmitting }) => {

                        setSubmitting(true);

                        values.confirmation = values.password;

                        await api.post('users/insert', values
                            ).then(function (response) {
                            console.log(JSON.stringify(response.data));
                            })
                            .catch(function (error) {
                                console.log(error);
                            });

                        setSubmitting(false);

                        router.push("/organizations");
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
                        <MyTextField placeholder="Telefone" name="phoneNumber" type="input" as={TextField} />
                        <br/>
                        <MyTextField placeholder="Localização" name="location" type="input" as={TextField} />

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