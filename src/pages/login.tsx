import {Formik, Form, useField, FieldAttributes } from 'Formik'
import {TextField, Button } from "@material-ui/core";
import * as Yup from 'Yup';
import styles from './styles/register.module.scss'
import  Head  from "next/head";
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import { api } from '../../services/api';
import {AuthContext} from '../Context/AuthContext'
import React, {useContext, useEffect} from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';

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





export default function Login(){
  const router = useRouter();
  useEffect(()=>{
    const token = Cookies.get('token');
    if(token){
      router.push(`/users/${Cookies.get('user')}`)
    }
  })

  const {authenticated,handleLogin} = useContext(AuthContext);
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <NavBar/>
      <div className={styles.register}>
      <h1>Login</h1>
      <Formik initialValues = {{
                username: 'fred123',
                password: 'password123F'
              
            }}
            validationSchema = {validationSchema}
            
            //resetform
            onSubmit={ async(values, {setSubmitting}) => {
              console.log("submitting");
              setSubmitting(true);
              
              handleLogin(values);
              console.log(authenticated);
              
              console.log("submitted");
              //console.log(user)
             
              setSubmitting(false);
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
