import { Formik, Form, useFormik, useField, FieldAttributes } from 'Formik';
import { TextField, Button} from "@material-ui/core";
import * as Yup from 'Yup';
import styles from './styles/register.module.scss';
import Head from "next/head";
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import { api } from '../../services/api';
import { useState } from 'react';


export default function Register() {
  const MyTextField: React.FC<FieldAttributes<{}>> = ({ placeholder, type, ...props }) => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return (
      <TextField variant="outlined" type={type}
        size="small" placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} onClick={() => setIsUserNameValid(true) } InputLabelProps={{
          className: styles.form 
  
        }} />
    )
  }
  
  const [messageDisplay, setShow] = useState(false);
  const [isUserNameValid, setIsUserNameValid] = useState(true);
  const[isEmailValid, setIsEmailValid] = useState(true);

  const validationSchema = Yup.object({
    username: Yup.string()
      .matches(/^(\S+$)/, "Não pode conter espaços")
      .min(5, "O nome da conta deve ter entre 5 a 15 caráteres.")
      .max(15, "O nome da conta deve ter entre 5 a 15 caráteres.")
      .required("Obrigatório"),
    name: Yup.string().required("Obrigatório"),
    email: Yup.string()
      .email("Por favor insira um email válido.")
      .required("Obrigatório"),

    password: Yup.string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        "Deve conter no mínimo 8 caráteres com pelo menos 1 minúscula, 1 maiúscula e 1 dígito")
      .required("Obrigatório"),
    confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords têm de ser iguais.")
      .required("Obrigatório"),
  
  });

  return (
    <div>
      <Head>
        <title>Registar</title>
      </Head>
      <NavBar />

      {!messageDisplay ? 

        <div className={styles.register}>
          <h1>Registar</h1>
          <Formik initialValues={{
            username: '',
            name: '',
            email: '',
            password: '',
            confirmation: '',

          }}
            validationSchema={validationSchema}

            onSubmit={async (values, { setSubmitting }) => {

              let error = '';

              await api.post('users/insert', values
              ).then(function (response) {
                console.log(JSON.stringify(response.data));
              })
                .catch(function (error) {
                  error = error.response.data;
                });
              

              if (error == 'username') 
                setIsUserNameValid(false);
              
              else if (error )
              
              
              if(data !== values.username) {
                setSubmitting(true);

              await api.post('users/insert', values
              ).then(function (response) {
                console.log(JSON.stringify(response.data));
              })
                .catch(function (error) {
                  console.log(error);

                });

                setShow(true);

                setSubmitting(false);
              }
              else{
                setIsUserNameValid(false);
              }
            }}>

            {({ isSubmitting }) => (
              <Form className={styles.form}  >
                
                <MyTextField placeholder="Nome de utilizador" id="username" name="username" type="input" as={TextField} /> 
                
                {
                  !isUserNameValid ? 
                  
                    <a className={styles.erro}>Este nome de utilizador já está em uso, por favor escolha outro.</a>
               
                  : 

                  <></>
                }

                <br/>
                <MyTextField placeholder="Primeiro nome" name="name" type="input" as={TextField} /> <br/>
                
                <MyTextField placeholder="Email" name="email" type="input" as={TextField}/> 
                
                {
                  !isEmailValid ? 
                  
                    <a className={styles.erro}>Este email já está associado a uma conta, por favor escolha outro.</a>
               
                  : 

                  <></>
                }
                
                <br/>
                <MyTextField placeholder="Password" name="password" type="password" as={TextField} /> <br/>
                <MyTextField placeholder="Confirmar Password" name="confirmation" type="password" as={TextField} /> <br/>
                <div> 
                  <Button disabled={isSubmitting} type="submit">Submeter</Button>
                </div>
              </Form>
            )}

          </Formik>
        </div>

        : 

        <div className={styles.register}>
          <a>Irá receber um email de confirmação para poder iniciar sessão e começar a voluntariar-se.</a>
        </div>
      }
      <Footer />
    </div>
  );
}
