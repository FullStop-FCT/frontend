import styles from "./styles/home.module.scss";
import {useState} from 'react'
import  Head  from "next/head";
import Footer from '../Components/Footer';
import Header from  '../Components/Header';
import Activitiy from '../Components/Activities'
import  Link from 'next/link';
import {AuthContext} from '../Context/AuthContext'
import React, {useContext, useEffect} from 'react'
export default function Home() {
  const{subAtivity,setSubAtivity } = useContext(AuthContext);
  //const[ativity, setAtivity] = useState(false);
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
          <button onClick={()=>setSubAtivity(!subAtivity)}>criar atividade</button>
          <div>
            {
              subAtivity ? <Activitiy/> : <></>
            }
          
          </div>
          
      </div>
      <div className={styles.Other}>

      </div>
     
      
    </div>
     
  )
}

