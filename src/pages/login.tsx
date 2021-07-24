import { Formik, Form, useField, FieldAttributes } from 'Formik';
import { TextField, Button } from "@material-ui/core";
import * as Yup from 'Yup';
import styles from './styles/login.module.scss';
import Head from "next/head";
import NavBar from '../Components/NavBar';
import { AuthContext } from '../Context/AuthContext';
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { Token } from '../types';
import jwt_decode from "jwt-decode";



const validationSchema = Yup.object({
  username: Yup.string()
    .required("Obrigatório"),
  password: Yup.string()
    .required("Obrigatório"),
  lastName: Yup.string(),
});

export default function Login() {

  let token: Token = null
  
  let getJwt = Cookies.getJSON('token');

  if (getJwt)
    token = jwt_decode(Cookies.getJSON('token'));


  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push(`/${token.iss}`)
    }
  })  

  const { authenticated, handleLogin, error } = useContext(AuthContext);

  const[emailError, setEmailError] = useState(false);
  const[inputError, setInputError] = useState(false);


  const MyTextField: React.FC<FieldAttributes<{}>> = ({ type, placeholder, ...props }) => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return (
      <TextField variant="outlined" type={type}
        size="small" placeholder={placeholder} {...field} helperText={errorText} onClick={() => setInputError(false)} error={!!errorText} InputLabelProps={{
          className: styles.form
  
        }} />
    )
  }

  return (
    <div>
      <div>
        <Head>
          <title>Login</title>
        </Head>
        <NavBar />

        

          <div className={styles.login}>

            {!emailError ? 
              <>
                <h1>Login</h1>
                <Formik initialValues={{
                  username: '',
                  password: ''
                }}
                  validationSchema={validationSchema}

                  onSubmit={async (values, { setSubmitting }) => {

                  setSubmitting(true);

                  if(error == 'email')
                    setEmailError(true);

                  else if(error == 'inputerror')
                    setInputError(true);

                  else {
                    handleLogin(values);
                    setSubmitting(false);
                  }
                  }}>


                {({ isSubmitting }) => (
                  <Form className={styles.form}  >

                    {inputError?

                      <a className={styles.erro}>Por favor verifique se os dados que inseriu estão corretos.</a>

                      :

                      null
                  }

                    <MyTextField className={styles.input} placeholder="Nome de utilizador" name="username" type="input" as={TextField} />
                    <br />
                    <MyTextField placeholder="Password" name="password" type="password" as={TextField} />
                    <br />

                    <Link href="/forgot-password"><a className={styles.link}>Esqueceu-se da password?</a></Link>
                    <div>
                      <Button disabled={isSubmitting} type="submit">Login</Button>
                    </div>
                  </Form>

                  )
                }
              </Formik>
            </>
          
            :

            <a>Por favor confirme o seu email. Caso não o encontre, verifique a sua caixa de spam. </a>

            }
        </div>
    </div>
  </div>
  );
}
