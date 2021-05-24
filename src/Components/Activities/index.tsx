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
                    .min(100, "A descrição deve conter no minímo 100 caráteres.")
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
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.register} >
      
      <Formik initialValues = {{
                title: 'Primeira Atividade do HH',
                description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m',
                date: '23/05/2021',
                location: 'Caparica',
                totalParticipants: 5,
                category: 'Sla',
                activityOwner: 'FullStop',

            }}
            validationSchema = {validationSchema}
            
            //resetform
            onSubmit={ async(values, {setSubmitting}) => {
              console.log("submitting");
              setSubmitting(true);
              const config = {
                headers: {  'Content-Type': 'application/json'}
              }
              const token = Cookies.get('token');
              const request = JSON.stringify({token:{...JSON.parse(token) as Token},activityData:{...values}})
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
              router.push("/home")
            }}>
              

        {({isSubmitting}) => (
          <Form  className={styles.form} >
            <MyTextField placeholder="title"name="title" type="input" as={TextField}/>
            <MyTextField placeholder="description"name="description" type="input" as={TextField}/>
            <MyTextField placeholder="date"name="date" type="input" as={TextField}/>
            <MyTextField placeholder="location"name="location" type="input" as={TextField}/>
            <MyTextField placeholder="totalParticipants"name="totalParticipants" type="input" as={TextField}/>
            <MyTextField placeholder="category"name="category" type="input" as={TextField}/>
            <MyTextField placeholder="activityOwner"name="activityOwner" type="input" as={TextField}/>
           
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
