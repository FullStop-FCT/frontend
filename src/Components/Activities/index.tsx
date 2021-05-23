import {Formik, Form, useField, FieldAttributes } from 'Formik'
import {TextField, Button } from "@material-ui/core";
import * as Yup from 'Yup';
import ''
import  Head  from "next/head";
import { api } from '../../../services/api';
import {AuthContext} from '../../Context/AuthContext'
import React, {useContext, useEffect} from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';

const MyTextField: React.FC<FieldAttributes<{}>> = ({type,placeholder,...props}) =>{
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return(
    <TextField variant="outlined" type={type}
    size="small" placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} InputLabelProps={{
      //className: styles.form
     
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





export default function Activities(){
  const router = useRouter();
  
  const {authenticated} = useContext(AuthContext);
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <div >
      <h1>Login</h1>
      <Formik initialValues = {{
                title: '',
                description: '',
                date: '',
                location: '',
                totalParticipants: '',
                category: '',
                activityOwner: '',

            }}
            validationSchema = {validationSchema}
            
            //resetform
            onSubmit={ async(values, {setSubmitting}) => {
              console.log("submitting");
              setSubmitting(true);
              
              console.log(authenticated);
              
              console.log("submitted");
              //console.log(user)
             
              setSubmitting(false);
            }}>
              

        {({isSubmitting}) => (
          <Form   >
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
