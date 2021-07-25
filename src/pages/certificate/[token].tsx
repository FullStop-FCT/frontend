import React, { useEffect } from 'react';
import { pdf, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import MyDocument from '../../Components/Certificate';
import styles from '../styles/pdf.module.scss'
import Cookies from 'js-cookie';
import { api } from "../../../services/api";
import { useState } from 'react';
import { listAtivitiesProps } from "../../types";
import jwt_decode from "jwt-decode"
import UnauthorizedAcess from '../../Components/UnauthorizedAccess';

export type Token = {
  exp: number,
  iat: number,
  iss: string,
  id: string,
  name: string
}

export default function App() {

  const[values, setValues] = useState<listAtivitiesProps>([]);

  const path = window.location.pathname.split('/');
  const token = path[path.length-1];
  let name = "";
  let decoded_token: Token = null;

  try {
    decoded_token = jwt_decode(token);
    name = decoded_token.name;
  }
  catch (error) {
    return <UnauthorizedAcess />;
  }

  if (process.env.CERTIFICATE_KEY !== decoded_token.id)
    return <UnauthorizedAcess />

  useEffect(() => {

    async function fetch(){

      let config = {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type' : 'application/json'
        }
      }
    
      return await api.get('activities/listCertificateActivities', config)
                .then( function(response) {
                  setValues(response.data.reverse());
                })
                .catch(error => console.log(error));
  }

  fetch();

  }, [])

 return ( 
    <div>

    <PDFViewer className={styles.viewer}>
        <MyDocument user_name={name} activities={values}/>
    </PDFViewer>
  </div>
)
}

