import styles from "./styles/home.module.scss";
import {useState} from 'react'
import  Head  from "next/head";
import Footer from '../Components/Footer';
import Header from  '../Components/Header';
import Activitiy from '../Components/Activities'
import  Link from 'next/link';
import {AuthContext} from '../Context/AuthContext'
import React, {useContext, useEffect} from 'react'
import Cookies from 'js-cookie'
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { api } from "../../services/api";
import useSWR from 'swr'
import {useRouter} from 'next/router'
import SessionOf from '../Components/SessionOf'
import MapView from "../Components/Maps";
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

type listAtivitiesProps = AtivitiesProps[];

//await api.post('activities/list',token)
async function fetcher(path:string): Promise<listAtivitiesProps> {

  const token: Token  = Cookies.getJSON('token')
  return  await api.post(path,token).then(response => response.data);
  
}

export default function Home() {
  const{subAtivity,setSubAtivity, authenticated } = useContext(AuthContext);

  const router = useRouter();
  useEffect(() => {
    if(!authenticated){
      router.push('/login')
    }
  },[])



  const { data, error} = useSWR('activities/list', fetcher);
  

  let props: listAtivitiesProps = data;

  
  if (error) {return <SessionOf/>}
  if (!data) return <div>loading...</div>


  return (
    
    <div className={styles.Container} >
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
          <button onClick={()=>setSubAtivity(!subAtivity)} >criar atividade</button>
          
          
            {
              subAtivity ? 
              <div className= {styles.activity} >
                <button className={styles.but} onClick={()=>setSubAtivity(false)} ><p>&#10006;</p></button>
              <Activitiy/> 
              
              </div>  
              : <></>
            }
          
          
          <ul>
            {props.map((ativ,index) =>{
              return (
                <li key={index}>
                  <div className={styles.ativity}>
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
                </div>
              </li>
                
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

