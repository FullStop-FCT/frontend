import styles from "./styles/home.module.scss";
import {useState} from 'react'
import  Head  from "next/head";
import Footer from '../Components/Footer';
import Header from  '../Components/Header';
import Activitiy from '../Components/Activities'
import  Link from 'next/link';
import {AuthContext} from '../Context/AuthContext'
import React, {useContext, useEffect} from 'react'
import Cookies from 'cookie'
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { api } from "../../services/api";

type Token = {
  username: string,
   tokenID: string,
    role: string,
     creationData: number, 
     expirationData: number
}

type AtivitiesProps = {
  title: string,
  description: string ,
  date: string,
  location: string,
  totalParticipants: string,
  activityOwner: string,
  category: string
}

type listAtivitiesProps = {
    data: AtivitiesProps[];
}

export const  getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

  // Fetch data from external API
  var token:Token;
  try{
    token= JSON.parse(Cookies.parse(context.req.headers.cookie).token);

  }catch(err){
    if(!token){
      return { 
        props: {}
      }
  }
  
  
  }
  console.log('loading');
  console.log(token)
  console.log('loading');

  var data: listAtivitiesProps;
  await api.post('activities/list',token)
  .then(function(response){
    console.log(response.data)
    data = response.data
  }).catch(function(error){
    console.log(error);
  })
  

  return { 
    props: {data}
  }

}


export default function Home(props: listAtivitiesProps) {
  console.log(props.data)
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
          <ul>
            {props.data.map((ativ,index) =>{
              return (
                <div className={styles.ativity}><li key={ativ.title}>
                <p>
                  {ativ.title}
                </p>
                <p>
                  {ativ.description}
                </p>
                <p>
                  {ativ.date}
                </p>
                <p>
                  {ativ.location}
                </p>
                <p>
                  {ativ.totalParticipants}
                </p>
                <p>
                  {ativ.activityOwner}
                </p>
                <p>{ativ.category}</p>
              </li> </div>
                
              )
            })}
            <br/>
          </ul>
      </div>
      <div className={styles.Other}>

      </div>
     
      
    </div>
     
  )
}

