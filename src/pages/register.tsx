import {Formik, Field, Form, useField, FieldAttributes } from 'Formik'
import {TextField, Button, InputBase } from "@material-ui/core";
import * as Yup from 'Yup';
import styles from './styles/register.module.scss'
import  Head  from "next/head";
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import { api } from '../../services/api';
import axios, { AxiosRequestConfig } from 'axios';


const MyTextField: React.FC<FieldAttributes<{}>> = ({placeholder,type,...props}) =>{
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return(
    <TextField variant="outlined" type={type}
    size="small" placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} InputLabelProps={{
      className: styles.form
     
    }}/>
  )
}

const validationSchema = Yup.object({
  username: Yup.string()
      .matches(/^(\S+$)/, "Não pode conter espaços")
      .min(5, "O nome da conta deve ter entre 5 a 15 caráteres.")
      .max(15, "O nome da conta deve ter entre 5 a 15 caráteres.")
      .required("Obrigatório"),
  name: Yup.string(),
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



export default function Register(){
 
  return (
    <div>
      <Head>
        <title>Register</title>
      </Head>
      <NavBar/>
      <div className={styles.register}>
      <h1>Inscreva-se</h1>
      <Formik initialValues = {{
                username: '',
                name: '',
                email: '',
                password: '',
                confirmation: '',
               
            }}
            validationSchema = {validationSchema}
          
            //resetform
            onSubmit={async (values, {setSubmitting}) => {
            
            console.log("submitting");
              setSubmitting(true);
              await api.post('users/insert',values  
              ).then(function (response) {
                console.log(JSON.stringify(response.data));
              })
              .catch(function (error) {
                console.log(error);
              });
              
              setSubmitting(false);
              console.log("submitted");
              
            }}>

        {({isSubmitting}) => (
          <Form className={styles.form}  >
            <MyTextField className={styles.input} placeholder="username"name="username" type="input" as={TextField}/>
            <MyTextField placeholder="first name" name="name" type="input" as={TextField}/>
            <MyTextField placeholder="email" name="email" type="input" as={TextField}/>
            <MyTextField placeholder="password" name="password" type="password" as={TextField}/>
            <MyTextField placeholder="confirm password" name="confirmation" type="password" as={TextField}/>
                      <div>
                      <Button disabled={isSubmitting} type="submit">Inscrever-se</Button>
                      </div>
          </Form>



      )


        }
      </Formik>
      </div>
      <Footer/>
    </div>

  );

}
