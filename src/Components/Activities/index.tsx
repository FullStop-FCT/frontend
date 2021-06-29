import { Formik, Form, useField, FieldAttributes } from 'Formik'
import { TextField, Button } from "@material-ui/core";
import * as Yup from 'Yup';
import Head from "next/head";
import { api } from '../../../services/api';
import { AuthContext } from '../../Context/AuthContext'
import { MapContext } from '../../Context/MapContext'

import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import styles from './styles.module.scss'
import MapView from '../Maps';
import { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ptBr from 'date-fns/locale/pt-BR'
import format from 'date-fns/format'
import { StayCurrentLandscapeTwoTone } from '@material-ui/icons';
import moment from 'moment'

const MyTextField: React.FC<FieldAttributes<{}>> = ({ type, placeholder, ...props }) => {

  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField type={type}
      size="small" placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} />
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
  date: Yup.date()
    .required("Obrigatorio"),

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



export default function Activities() {
  const router = useRouter();
  const { subAtivity, setSubAtivity } = useContext(AuthContext);
  const { authenticated } = useContext(AuthContext);
  const { activityLocation, markers } = useContext(MapContext
  )
  const token: Token = JSON.parse(Cookies.get('token'));

  const [date, setDate] = useState("");
  const handleDateChange = (event) => {

    setDate(format(new Date(event.target.value), "dd/MM/yyyy HH:mm"))
    console.log(date)

  };
  return (
    <div className={styles.container}>
      <div>

        <Formik initialValues={{
          title: '',
          description: '',
          date: '',
          location: activityLocation,
          totalParticipants: '',
          activityOwner: token.username,
          category: '',
          lat: '',
          lon: '',

        }}
          validationSchema={validationSchema}

          //resetform
          onSubmit={async (values, { setSubmitting }) => {
            console.log("submitting");
            setSubmitting(true);
            const config = {
              headers: { 'Content-Type': 'application/json' }
            }

            values.location = activityLocation;
            values.lat = markers.lat + '';
            values.lon = markers.lng + '';
            values.date = date;
            const request = JSON.stringify({ token: { ...(token) }, activityData: { ...values } })
            console.log(request)
            console.log(authenticated)
            if (values.location !== "") {
              if (authenticated) {
                await api.post('activities/insert', request, config)
                  .then(function (response) {
                    // setSubAtivity(!subAtivity)
                    console.log(response.data)
                  }).catch(function (error) {

                    console.log(error);
                  })
              }
            }
            else {
              alert('sem location')
            }
            setSubmitting(false);
            //router.reload()
          }}>


          {({ isSubmitting }) => (
            <Form className={styles.form} >
              <MyTextField placeholder="title" name="title" type="input" as={TextField} />
              <MyTextField placeholder="description" name="description" type="input" as={TextField} />
              <MyTextField placeholder="totalParticipants" name="totalParticipants" type="input" as={TextField} />
              <MyTextField placeholder="category" name="category" type="input" as={TextField} />
              <p>data</p>
              <MyTextField
                id="datetime-local"

                type="datetime-local"
                name="date"
                // variant='outlined'
                placeholder="data"
                defaultValue={null}
                onChange={(event) => handleDateChange(event)}
                //InputLabelProps={{
                //shrink: true,
                //] }}
                as={TextField}
              />

              <div className={styles.mapView}>
                <MapView />


              </div>

              <div>
                <Button disabled={isSubmitting} type="submit">submit</Button>
              </div>
            </Form>




          )


          }
        </Formik>
      </div>

    </div >

  );

}
