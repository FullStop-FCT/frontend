import { Formik, Form, useField, FieldAttributes } from 'Formik';
import { TextField, Button } from "@material-ui/core";
import styles from './styles/register.module.scss';
import Head from "next/head";
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import * as Yup from 'Yup';
import { useState } from 'react';
import { api } from "../../services/api";

const MyTextField: React.FC<FieldAttributes<{}>> = ({ type, placeholder, ...props }) => {
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
  username: Yup.string().required("Obrigatório")
});



export default function Password() {

  const [email, setEmail] = useState("");
  const [messageDisplay, setShow] = useState(false);
  const string = "";

  async function sendEmail(username) {

    const config = {
      headers: { 
      'Content-Type': 'application/json'  
      }
    };

    return await api.post('users/resetpwd', username, config)
                    .then( function (response) {
                      setEmail(response.data);
                      setShow(true);
                    })
                    
                    .catch(error => console.log(error));
  }

    return (

        <div>

          <Head>
            <title>Password</title>
          </Head>

          <NavBar />
          
          {!messageDisplay ?

            <div className={styles.register}>

              <h1 style={{fontSize: "2.5rem"}}>Insira o seu nome de utilizador</h1>

              <Formik initialValues={{
                username: '',
              }}
                validationSchema={validationSchema}

                onSubmit={async (values, { setSubmitting }) => {

                  setSubmitting(true);

                  sendEmail(values.username);
                  
                  setSubmitting(false);
                }}>


                {({ isSubmitting }) => (
                  <Form className={styles.form}  >
                    <MyTextField className={styles.input} placeholder="Nome de utilizador" name="username" type="input" as={TextField} />
                    <br />

                    <div>
                      <Button disabled={isSubmitting} type="submit">Enviar Email</Button>
                    </div>
                  </Form>

                )
                }
              </Formik>
            </div>

            :

            <div className={styles.register}>
              <a>Foi enviado um email para {email}.</a>
            </div>
          }

          <Footer />
        </div>
    )
}