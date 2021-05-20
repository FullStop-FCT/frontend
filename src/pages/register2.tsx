import {Formik, Field, Form, useField, FieldAttributes } from 'Formik'
import {TextField, Button } from "@material-ui/core";
import * as Yup from 'yup';
import styles from './styles/register.module.scss'
import  Head  from "next/head";
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'

const MyTextField: React.FC<FieldAttributes<{}>> = ({placeholder,...props}) =>{
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return(
    <TextField color="secondary"  variant="outlined"
    size="small" placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} InputLabelProps={{
      className: styles.input
     
    }}/>
  )
}

const validationSchema = Yup.object({
  username: Yup.string()
      .matches(/^(\S+$)/, "Não pode conter espaços")
      .min(5, "O nome da conta deve ter entre 5 a 15 caráteres.")
      .max(15, "O nome da conta deve ter entre 5 a 15 caráteres.")
      .required("Obrigatório"),
  email: Yup.string()
      .email("Por favor insira um email válido.")
      .required("Obrigatório"),
  password: Yup.string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
              "Deve conter no mínimo 8 caráteres com pelo menos 1 minúscula, 1 maiúscula e 1 dígito")
      .required("Obrigatório"),
      passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords têm de ser iguais.")
      .required("Obrigatório"),
  firstName: Yup.string(),
  lastName: Yup.string(),
  phoneNumber: Yup.number().positive().integer("Não pode conter letras")
      .test("len", "Deve ter exatamente 9 dígitos.", (val) => { if(val) return val.toString().length === 9; })
      .typeError("Não pode conter letras.")
});

export default function Register(){
  return (
    <div>
      <Head>
        <title>Register</title>
      </Head>
      <NavBar/><h1>Inscreva-se</h1>
      <div className={styles.register}>
      
      <Formik initialValues = {{
                username: '',
                email: '',
                password: '',
                passwordConfirm: '',
                firstName: '',
                lastName: '',
                phoneNumber: ''
            }}
            validationSchema = {validationSchema}
            
            //resetform
            onSubmit={(data, {setSubmitting}) => {
              setSubmitting(true);
              
              console.log('submit:',data);
              setSubmitting(false);
            }}>

        {({values,isSubmitting}) => (
          <Form className={styles.form}  >
            <MyTextField className={styles.input} id="outlined-basic" placeholder="username"name="username" type="input" as={TextField}/>
            <MyTextField placeholder="email" name="email" type="input" as={TextField}/>
            <MyTextField placeholder="passwrod" name="password" type="password" as={TextField}/>
            <MyTextField placeholder="confirm password" name="passwordConfirm" type="password" as={TextField}/>
            <MyTextField placeholder="first name" name="firstName" type="input" as={TextField}/>
            <MyTextField placeholder="last name" name="lastName" type="input" as={TextField}/>
            <MyTextField placeholder="phone number" name="phoneNumber" type="input" as={TextField}/>
                      <div>
                      <Button disabled={isSubmitting} type="submit">submit</Button>
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
