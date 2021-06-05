import {Formik, Form, useField, FieldAttributes } from 'Formik'
import {TextField, Button } from "@material-ui/core";
import * as Yup from 'Yup';
import  Head  from "next/head";
import { api } from '../../../services/api';
import {AuthContext} from '../../Context/AuthContext'
import React, {useContext, useEffect} from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import styles from './styles.module.scss'
import MapView from '../Maps';


const MyTextField: React.FC<FieldAttributes<{}>> = ({type,placeholder,...props}) =>{
  
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return(
    <TextField variant="outlined" type={type}
    size="small" placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} InputLabelProps={{
      className: styles.form
     
    }}/>
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
                location: Yup.string()
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

export default function Activities(){
  const router = useRouter();
  const{subAtivity,setSubAtivity } = useContext(AuthContext);
  const {authenticated} = useContext(AuthContext);
  const token: Token = JSON.parse(Cookies.get('token'));
  return (
    <div className={styles.container}>
      <div>
      
      <Formik initialValues = {{
                title: '',
                description: '',
                date: '',
                location: '',
                totalParticipants: '',
                category: '',
                activityOwner: token.username,

            }}
            validationSchema = {validationSchema}
            
            //resetform
            onSubmit={ async(values, {setSubmitting}) => {
              console.log("submitting");
              setSubmitting(true);
              const config = {
                headers: {  'Content-Type': 'application/json'}
              }
              
              const request = JSON.stringify({token:{...(token)},activityData:{...values}})
              console.log(request)
              console.log(authenticated)
              if(authenticated){
                await api.post('activities/insert', request,config)
                .then(function(response){
                  setSubAtivity(!subAtivity)
                  console.log(response.data)
                }).catch(function(error){
                  
                  console.log(error);
                })
              }
             
             
              setSubmitting(false);
              router.reload()
            }}>
              

        {({isSubmitting}) => (
          <Form  className={styles.form} >
            <MyTextField placeholder="title"name="title" type="input" as={TextField}/>
            <MyTextField placeholder="description"name="description" type="input" as={TextField}/>
            <MyTextField placeholder="date"name="date" type="input" as={TextField}/>
            <MyTextField placeholder="totalParticipants"name="totalParticipants" type="input" as={TextField}/>
            <MyTextField placeholder="category"name="category" type="input" as={TextField}/>
            <div className={styles.mapView}>
            <MapView/>
            

            </div>
           
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
