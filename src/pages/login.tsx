import {Formik, Field, Form, useField, FieldAttributes } from 'Formik'
import {TextField, Button, InputBase } from "@material-ui/core";
import * as Yup from 'Yup';
import styles from './styles/register.module.scss'
import  Head  from "next/head";
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import { type } from 'os';
import { AxiosRequestConfig } from 'axios';
import { api } from '../../services/api';

const MyTextField: React.FC<FieldAttributes<{}>> = ({type,placeholder,...props}) =>{
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
      .required("Obrigatório"),
  password: Yup.string()
      .required("Obrigatório"),
  lastName: Yup.string(),
});

var config:  AxiosRequestConfig = {
  headers: { 
    'Content-Type': 'application/json'
  }
};
export default function Register(){
  return (
    <div>
      <Head>
        <title>Register</title>
      </Head>
      <NavBar/>
      <div className={styles.register}>
      <h1>Login</h1>
      <Formik initialValues = {{
                username: '',
                password: ''
              
            }}
            validationSchema = {validationSchema}
            
            //resetform
            onSubmit={async (values, {setSubmitting}) => {
              console.log("submitting");
              setSubmitting(true);
              await api.post('authentication/login',values, 
                config   
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
            <MyTextField placeholder="password" name="password" type="password"  as={TextField} />
           
                      <div>
                      <Button disabled={isSubmitting} type="submit">Login</Button>
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
