import {Formik, Field, Form, useField, FieldAttributes } from 'Formik'
import {TextField, Button, InputBase } from "@material-ui/core";
import * as Yup from 'Yup';
import styles from './styles/register.module.scss'
import  Head  from "next/head";
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'

const MyTextField: React.FC<FieldAttributes<{}>> = ({placeholder,...props}) =>{
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return(
    <TextField variant="outlined"
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
            onSubmit={(data, {setSubmitting}) => {
              setSubmitting(true);
              
              console.log('submit:',data);
              setSubmitting(false);
            }}>

        {({values,isSubmitting}) => (
          <Form className={styles.form}  >
            <MyTextField className={styles.input} placeholder="username"name="username" type="input" as={TextField}/>
            <MyTextField placeholder="passwrod" name="password" type="password" as={TextField}/>
           
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
