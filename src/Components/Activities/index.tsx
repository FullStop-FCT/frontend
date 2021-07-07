import { Formik, Form, useField, FieldAttributes } from 'Formik'
import { TextField, Button, makeStyles } from "@material-ui/core";
import * as Yup from 'Yup';
import { api } from '../../../services/api';
import { AuthContext } from '../../Context/AuthContext'
import { MapContext } from '../../Context/MapContext'
import FormControl from '@material-ui/core/FormControl';
import React, { useContext } from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import KeyWord from '../keywords/'
import Cookies from 'js-cookie';
import styles from './styles.module.scss'
import MapView from '../Maps';
import { useState } from 'react';
import format from 'date-fns/format'
import { useRouter } from 'next/router'

const MyTextField: React.FC<FieldAttributes<{}>> = ({ type, placeholder, ...props }) => {

  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField type={type}
      size="small" placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} variant="outlined" />
  )
}

const Multiline: React.FC<FieldAttributes<{}>> = ({ type, placeholder, ...props }) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField rows={3} variant="outlined" multiline type={type}
      size="small" placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} className={styles.multiline} />
  )
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 340,
    background: 'linear-gradient(45deg, #fff 30%, #fff 90%)',
  },


}));





const validationSchema = Yup.object({
  title: Yup.string()
    .min(10, "O título deve ter entre 10 a 50 caráteres.")
    .max(50, "O título deve ter entre 10 a 50 caráteres.")
    .required("Obrigatório"),
  description: Yup.string()
    .min(10, "A descrição deve conter no minímo 100 caráteres.")
    .required("Obrigatório"),
  date: Yup.date().required("Obrigatório"),
  totalParticipants: Yup.number()
    .moreThan(0, "Uma atividade precisa de pelo menos uma pessoa.")
    .typeError("Não pode conter letras.")
    .required("Obrigatório"),
  // category: Yup.string().required("Obrigatório")
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
  const classes = useStyles();
  const [localerror, setLocalError] = useState(false)
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const { keywords } = useContext(AuthContext);
  const { authenticated } = useContext(AuthContext);
  const { activityLocation, markers } = useContext(MapContext
  )
  const token: Token = JSON.parse(Cookies.get('token'));

  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [timein, setTimeIn] = useState(format(new Date(), "HH:mm"));
  const [timeout, setTimeOut] = useState(format(new Date(), "HH:mm"));

  const handleChange = (event) => {
    setCategory(event.target.value);
    console.log(event.target.value)
  };

  function onKeyDown(keyEvent) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const DatePicker: React.FC<FieldAttributes<{}>> = ({ type, ...props }) => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return (
      <TextField variant="outlined" type="date" label="Data" value={date}
        helperText={errorText} error={!!errorText} onChange={handleDateChange} InputLabelProps={{
          shrink: true,
        }} />
    )
  }

  const TimeIn: React.FC<FieldAttributes<{}>> = ({ type, placeholder, ...props }) => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return (
      <TextField variant="outlined" type="time" label="Hora de início" value={timein}
        helperText={errorText} error={!!errorText} onChange={handleTimeIn} InputLabelProps={{
          shrink: true,
        }} />
    )
  }

  const TimeOut: React.FC<FieldAttributes<{}>> = ({ type, placeholder, ...props }) => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return (
      <TextField variant="outlined" type="time" label="Hora de fim" value={timeout}
        helperText={errorText} error={!!errorText} onChange={handleTimeOut} InputLabelProps={{
          shrink: true,
        }} />
    )
  }



  const handleDateChange = (event) => {

    setDate(format(new Date(event.target.value), "yyyy-MM-dd"))
    console.log(date)

  };

  const handleTimeIn = (event) => {
    setTimeIn(event.target.value)
    console.log(timein)
  }

  const handleTimeOut = (event) => {
    setTimeOut(event.target.value)
  }
  return (
    <div className={styles.container}>
      <div>

        <Formik initialValues={{
          title: '',
          description: '',
          date: date,
          location: activityLocation,
          totalParticipants: '',
          category: category,
          lat: '',
          lon: '',
          startHour: timein,
          endHour: timeout,
          keywords: keywords,
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
            values.startHour = timein;
            values.endHour = timeout;
            values.keywords = keywords;
            values.category = category;


            if (category == "") {
              values.category = "Outros"
            }
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
                setSubmitting(false);
                router.push('/home')
              }
            }
            else {
              //alert('Sem localização.')
              setLocalError(true)
            }
            setSubmitting(false);

          }
          }>


          {({ isSubmitting }) => (
            <Form className={styles.form} onKeyDown={onKeyDown}>
              <div className={styles.formtext}>
                <MyTextField placeholder="Título" name="title" type="input" as={TextField} />
                <Multiline placeholder="Descrição" name="description" type="input"
                  as={Multiline} />

                <MyTextField placeholder="Nº máximo de participantes" name="totalParticipants" type="input" as={TextField} />
                <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    displayEmpty
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={category}
                    onChange={handleChange}
                  >
                    <MenuItem value="" disabled>
                      Categorias
                    </MenuItem>
                    <MenuItem value={'Limpeza'}>Limpeza</MenuItem>
                    <MenuItem value={'Idosos'}>Idosos</MenuItem>
                    <MenuItem value={'Animais'}>Animais</MenuItem>
                    <MenuItem value={'Outros'}>Outros</MenuItem>
                  </Select>
                </FormControl>
                <div>
                  <KeyWord />
                </div>
                <br />
                <DatePicker
                  name="date"
                // variant='outlined'

                />
                <br />
                <TimeIn
                  name="timein"
                />
                <br />
                <TimeOut
                  name="timeout"
                />
              </div>
              <div className={styles.mapView}>
                {
                  localerror ? <span>Insira uma localizaçao</span> :
                    <></>
                }
                <MapView />
                <Button disabled={isSubmitting} type="submit">Criar </Button>

              </div>


              <div>

              </div>
            </Form>




          )


          }
        </Formik>
      </div>

    </div >

  );

}
