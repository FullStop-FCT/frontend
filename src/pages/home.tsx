import styles from "./styles/home.module.scss";

import  Head  from "next/head";
import Footer from '../Components/Footer';
import Header from  '../Components/Header';
import Activitiy from '../Components/Activities'
import  Link from 'next/link';
export default function Home() {
  return (
    
    <div className={styles.Container}>
      <Head>
        <title>Home</title>
        </Head>
      
      <div className={styles.Header} >
        <Header/>
      </div>
      <div className={styles.Feed}>
        <div className={styles.home}>
          <h1>Home</h1>
          </div>
          <button>criar atividade</button>
          <div>
          <Activitiy></Activitiy>
          </div>
          
      </div>
      <div className={styles.Other}>

      </div>
     
      
    </div>
     
  )
}
