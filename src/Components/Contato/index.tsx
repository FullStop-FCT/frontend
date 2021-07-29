import styles from "./styles.module.scss";
import React, { useState } from 'react';
import * as Yup from 'yup';
import { TextField, Button } from "@material-ui/core";
import { Formik, Form, useField, FieldAttributes } from 'formik';
import { useRouter } from 'next/router';

const MyTextField: React.FC<FieldAttributes<{}>> = ({ type, placeholder, ...props }) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField variant="outlined" type={type}
      size="small" placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} className={styles.multiline} />
  )
}

const Multiline: React.FC<FieldAttributes<{}>> = ({ type, placeholder, ...props }) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField rows={4} variant="outlined" multiline type={type}
      size="small" placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} className={styles.multiline} />
  )
}

const validationSchema = Yup.object({
  nome: Yup.string()
    .required("Obrigatório"),
  email: Yup.string()
    .email("Por favor insira um email válido.")
    .required("Obrigatório"),
  assunto: Yup.string()
    .max(15, "O assunto pode ter até 15 caracteres")
    .required("Obrigatorio"),
  mensagem: Yup.string()
    .max(100, "A mensagem pode ter no maximo 100 caracteres")
    .required("Obrigatorio")
});


export default function Contato() {

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: { preventDefault: () => void; currentTarget: { elements: Iterable<unknown> | ArrayLike<unknown>; }; }) {
    //prevents the form from submitting to the browser
    // console.log(e)
    e.preventDefault();
    var formData: any = {};

    //accesses the form values which do not come in an array and so therefore we wrap it with Array.from
    //then we can iterate it and store it in formData
    Array.from(e.currentTarget.elements).forEach((field: { name: string | number; value: any; }) => { formData[field.name] = field.value });
    //console.log(formData.name)
  }

  return (
    <div className={styles.Container}>
      <div className={styles.contato}>
        <h1>Contato</h1>
        <p>hxp@fullstop.website</p>
      </div>

      <div className={styles.feedback} >
        <h1>Fale connosco</h1>
        <Formik initialValues={{
          nome: '',
          email: '',
          assunto: '',
          mensagem: '',

        }}
          validationSchema={validationSchema}

          //resetform
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setLoading(true);
            setSubmitting(true);

            fetch('/api/contact', {
              method: 'post',
              body: JSON.stringify(values)
            });
            
            //console.log('')
            setSubmitting(false);
            setLoading(false)
            resetForm();
            router.push('/');
          }}>

          {({ isSubmitting }) => (
            <Form className={styles.form} id="form"  >
              <MyTextField placeholder="Nome" name="nome" type="input" as={TextField} />
              <br />
              <MyTextField placeholder="Email" name="email" type="input" as={TextField} />
              <br />
              <MyTextField placeholder="Assunto" name="assunto" type="input" as={TextField} />
              <br />
              <Multiline placeholder="Mensagem" name="mensagem" type="input"
              />

              <div >
                <Button disabled={isSubmitting} type="submit">Enviar</Button>
                <div className={styles.loading}>
                  {
                    loading ? <img src="/loadingfeedback.gif" alt="loading" /> : <> </>
                  }
                </div >
              </div>
            </Form>
          )
          }
        </Formik>

      </div>

    </div >
  )
}