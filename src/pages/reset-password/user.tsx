import { Formik, Form, useField, FieldAttributes } from 'Formik';
import { TextField, Button } from "@material-ui/core";
import styles from '../styles/register.module.scss';
import Head from "next/head";
import NavBar from '../../Components/NavBar';
import Footer from '../../Components/Footer';
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
  password: Yup.string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Deve conter no mínimo 8 caráteres com pelo menos 1 minúscula, 1 maiúscula e 1 dígito")
    .required("Obrigatório"),
  confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords têm de ser iguais.")
    .required("Obrigatório"),

});

const passwordReset = (values: { password: string, confirmation: string }) => {

  //TODO
  //BACK-END REQUEST

}

export default function Password() {

  const[messageDisplay, setShow] = useState(false);

    return (

        <div>

          <Head>
            <title>Password</title>
          </Head>

          <NavBar />

          {!messageDisplay ?

            <div className={styles.register}>

              <h1 style={{fontSize: "2.5rem"}}>Alterar Password</h1>

              <Formik initialValues={{
                password: '',
                confirmation: ''

              }}
                validationSchema={validationSchema}

                onSubmit={async (values, { setSubmitting }) => {

                  setSubmitting(true);

                  passwordReset(values);

                  setShow(true);

                  setSubmitting(false);
                }}>


                {({ isSubmitting }) => (
                  <Form className={styles.form}  >
                    <MyTextField className={styles.input} placeholder="Password" name="password" type="password" as={TextField} />
                    <br />
                    <MyTextField placeholder="Confirmar Password" name="confirmation" type="password" as={TextField} />
                    <br />

                    <div>
                      <Button disabled={isSubmitting} type="submit">Submeter</Button>
                    </div>
                  </Form>

                )
                }
              </Formik>
            </div>

            : 

            <div className={styles.register}>
              <a>A sua password foi alterada com sucesso.</a>
            </div>
          }

          <Footer />
        </div>
    )
}