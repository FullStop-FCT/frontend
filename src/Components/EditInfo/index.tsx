import { Formik, Form, useField, FieldAttributes } from 'Formik'
import { TextField, Button } from "@material-ui/core";
import * as Yup from 'Yup';
import Head from "next/head";
import { api } from '../../../services/api';
import { AuthContext } from '../../Context/AuthContext'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import styles from './styles.module.scss'
import MapView from '../Maps';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const MyTextField: React.FC<FieldAttributes<{}>> = ({ type, placeholder, ...props }) => {

  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField type={type}
      size="small" placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} InputLabelProps={{
        className: styles.form

      }} />
  )
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(10, "O título deve ter entre 10 a 50 caráteres.")
    .max(50, "O título deve ter entre 10 a 50 caráteres.")
    .required("Obrigatório"),
  description: Yup.string()
    .min(10, "A descrição deve conter no minímo 100 caráteres.")
    .required("Obrigatório"),
  date: Yup.string()
    .required("Obrigatório"),
  totalParticipants: Yup.number()
    .moreThan(0, "Uma atividade precisa de pelo menos uma pessoa.")
    .typeError("Não pode conter letras.")
    .required("Obrigatório"),
  category: Yup.string().required("Obrigatório")
});



type Token = {
  username: string,
  tokenID: string,
  role: string,
  creationData: number,
  expirationData: number
}
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),

    },
  },
  input: {
    display: 'none',
  },
}));
export default function EditInfo() {
  const classes = useStyles();
  const router = useRouter();
  const { subAtivity, setSubAtivity } = useContext(AuthContext);
  const { authenticated, activityLocation, setActivityLocation } = useContext(AuthContext);
  const [photoState, setphotoState] = useState(null);
  const token: Token = JSON.parse(Cookies.get('token'));
  const photoHandler = (event) => {
    console.log(event.target.files[0])
    setphotoState(event.target.files[0])
  }
  return (
    <div className={styles.container}>
      <div>

        <div className={styles.banneravatar}>

          <div className={styles.banner}>
            <div className={styles.avatar}>
              <div className={styles.icon}>
                <input accept="image/*" className={styles.input} id="icon-button-file" type="file" onChange={photoHandler} />
                <label htmlFor="icon-button-file">
                  <IconButton color="primary" aria-label="upload picture" component="span" className={styles.iconbutton} >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </div>
            </div>
          </div>
        </div>
        <Formik initialValues={{
          username: '',
          phoneNumber: '',
          mobileNumber: '',
          address: '',
          location: '',
          postalCode: '',
          birthday: '',
          gender: '',
          kind: '',

        }}
          validationSchema={validationSchema}

          //resetform
          onSubmit={async (values, { setSubmitting }) => {
            console.log("submitting");
            setSubmitting(true);





            const fd = new FormData();
            fd.append('image', photoState.state.selectedFile, photoState.state.selectedFile);

            if (authenticated) {
              await api.post()
                .then(function (response) {

                  console.log(response.data)
                }).catch(function (error) {

                  console.log(error);
                })
            }


            //alert('sem location')




            setSubmitting(false);
            //router.reload()
          }}>


          {({ isSubmitting }) => (

            <Form className={styles.form} >
              <MyTextField placeholder="username" name="username" type="input" as={TextField} />
              <MyTextField placeholder="phoneNumber" name="phoneNumber" type="input" as={TextField} />
              <MyTextField placeholder="mobileNumber" name="mobileNumber" type="input" as={TextField} />
              <MyTextField placeholder="address" name="address" type="input" as={TextField} />
              <MyTextField placeholder="location" name="location" type="input" as={TextField} />
              <MyTextField placeholder="postalCode" name="postalCode" type="input" as={TextField} />
              <MyTextField placeholder="birthday" name="birthday" type="input" as={TextField} />
              <MyTextField placeholder="gender" name="gender" type="input" as={TextField} />
              <MyTextField placeholder="kind" name="kind" type="input" as={TextField} />


              <div>
                <Button disabled={isSubmitting} type="submit">submit</Button>
              </div>
            </Form>



          )


          }
        </Formik>
      </div>

    </div>

  );

}
