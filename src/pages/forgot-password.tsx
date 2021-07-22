import { Formik, Form, useField, FieldAttributes } from 'Formik';
import { TextField, Button } from "@material-ui/core";
import styles from './styles/register.module.scss';
import Head from "next/head";
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import * as Yup from 'Yup';
import { useState } from 'react';

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
  email: Yup.string()
  .email("Por favor insira um email válido.")
  .required("Obrigatório")
});

const sendEmail = (values) => {

  //TODO
  //GET USER AND GENERATE TOKEN
  //SEND EMAIL

}

export default function Password() {

  const [messageDisplay, setShow] = useState(false);

    return (

        <div>

          <Head>
            <title>Password</title>
          </Head>

          <NavBar />
          
          {!messageDisplay ?

            <div className={styles.register}>

              <h1 style={{fontSize: "2.5rem"}}>Insira o seu email</h1>

              <Formik initialValues={{
                email: '',
              }}
                validationSchema={validationSchema}

                onSubmit={async (values, { setSubmitting }) => {

                  setSubmitting(true);

                  sendEmail(values);

                  setShow(true);
                  setSubmitting(false);
                }}>


                {({ isSubmitting }) => (
                  <Form className={styles.form}  >
                    <MyTextField className={styles.input} placeholder="Username" name="" type="input" as={TextField} />
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
              <a>Se existir um utilizador registado com este email, receberá um link para alterar a sua password.</a>
            </div>
          }

          <Footer />
        </div>
    )
}