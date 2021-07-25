import { Formik, Form, useField, FieldAttributes } from 'Formik'
import { TextField, Button, makeStyles } from "@material-ui/core";
import * as Yup from 'Yup';
import { api } from '../../../services/api';
import { AuthContext } from '../../Context/AuthContext'
import { MapContext } from '../../Context/MapContext'
import FormControl from '@material-ui/core/FormControl';
import React, { useContext, useEffect } from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import KeyWord from '../keywords/'
import Cookies from 'js-cookie';
import styles from './styles.module.scss'
import MapView from '../Maps';
import { useState } from 'react';
import format from 'date-fns/format';
import { useRouter } from 'next/router';
import { BiInfoCircle } from "react-icons/bi";
import { Popup } from 'semantic-ui-react'
import { Token } from '../../types';



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
    .min(50, "A descrição deve conter no minímo 100 caráteres.")
    .required("Obrigatório"),
  date: Yup.date().required("Obrigatório"),
  totalParticipants: Yup.number()
    .moreThan(0, "Uma atividade precisa de pelo menos uma pessoa.")
    .typeError("Não pode conter letras.")
    .required("Obrigatório"),
  // category: Yup.string().required("Obrigatório")
});


export default function Activities() {
  const router = useRouter();
  const classes = useStyles();
  const [localerror, setLocalError] = useState(false)
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const { keywords } = useContext(AuthContext);
  const { authenticated } = useContext(AuthContext);
  const { activityLocation, markers,mappoints } = useContext(MapContext
  )
  const token: Token = Cookies.getJSON('token')

  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [timeIn, setTimeIn] = useState(format(new Date(), "HH:mm"));
  const [timeOut, setTimeOut] = useState(format(new Date(), "HH:mm"));

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

  var today : any = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;

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
          startHour: timeIn,
          endHour: timeOut,
          keywords: keywords,
          waypoints: mappoints,
          activityTime : 0,

        }}
          validationSchema={validationSchema}

          //resetform
          onSubmit={async (values, { setSubmitting }) => {
            console.log("submitting");
            let timeinsplit = timeIn.split(":");
            let timeoutsplit = timeOut.split(":");

            let minutesTotal = (((parseInt(timeoutsplit[0])) * 60 +(parseInt(timeoutsplit[1])))              -((parseInt(timeinsplit[0])) * 60 +(parseInt(timeinsplit[1]))))
            console.log('total',minutesTotal);
            
            setSubmitting(true);
            
            values.location = activityLocation;
            values.lat = markers.lat + '';
            values.lon = markers.lng + '';
            values.date = date;
            values.startHour = timeIn;
            values.endHour = timeOut;
            values.keywords = keywords;
            values.waypoints = mappoints;
            values.category = category;
            values.activityTime = minutesTotal;
            

            if (category == "") {
              values.category = "Outros"
            }
            const request = JSON.stringify({ activityData: { ...values } })

            const config = {
              headers: { 
              'Authorization': 'Bearer ' + token ,
              'Content-Type': 'application/json' }  
            };
            
            console.log(request)
            console.log(authenticated)
            if (values.location !== "" || values.date === null) {
              if (authenticated) {
                await api.post('activities/insert',request,config)
                  .then(response => 
                    console.log(response.data)
                  ).catch( (error) => 
                    console.log('error ' +error)
                  )
                setSubmitting(false);
                window.location.href = '/home';
              }
            }
            else {
              alert('Prencher data')
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

                <div className={styles.iconRow}>

                  <Popup content={<div className={styles.info}><a className={styles.infoText}>Todas as atividades precisam de ser agendadas com pelo menos dois dias de antecedência.</a></div>} 
                    trigger={
                      <div className={styles.icon}>
                        <BiInfoCircle size="1.5em" />
                      </div>} 
                  />

                <input onChange={e => setDate(e.target.value) } type="date" className={styles.date} min={today}/>
                </div>

                <br />

                <input onChange={e => setTimeIn(e.target.value) } type="time" required />    

                <br />

                <input onChange={e => setTimeOut(e.target.value)} type="time" min={timeIn} required/>
                
              </div>
              <div className={styles.mapView}>
                {
                  localerror ? <span>Insira uma localizaçao</span> :
                    <></>
                }


                
                <MapView />
                <Button disabled={isSubmitting} type="submit">Criar </Button>

              </div>
            </Form>
          )
          }
        </Formik>
      </div>
    </div >
  );
}
