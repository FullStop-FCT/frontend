import React, { useEffect } from 'react';
import { pdf, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import MyDocument from '../../Components/Certificate';
import styles from '../styles/pdf.module.scss'
import Cookies from 'js-cookie';
import { api } from "../../../services/api";
import { useState } from 'react';
import { listAtivitiesProps } from "../../types";

export default function App() {

  const[values, setValues] = useState<listAtivitiesProps>([]);


  useEffect(() => {

    async function fetch(){

      const token = Cookies.getJSON('token');
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
    {/*<PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download now!'
      }
    </PDFDownloadLink>*/}
    <PDFViewer className={styles.viewer}>
        <MyDocument activities={values}/>
    </PDFViewer>
  </div>
)
}

