import React from 'react';
import ReactDOM from 'react-dom';
import { pdf, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import MyDocument from '../Components/Certificate';
import styles from './styles/pdf.module.scss'

export default function App() {
 return ( 
    <div>
    {/*<PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download now!'
      }
    </PDFDownloadLink>*/}
    <PDFViewer className={styles.viewer}>
        <MyDocument/>
    </PDFViewer>
  </div>
)
}

