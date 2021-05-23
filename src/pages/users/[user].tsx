import styles from '../styles/users.module.scss'
import  Head  from "next/head"
import { useEffect, useState } from 'react'
import {atividades} from './atividades';
import {AuthContext} from '../../Context/AuthContext';
import React, {useContext} from 'react'
import {useRouter} from 'next/router'
import Cookie from 'js-cookie'
import Header from '../../Components/Header'

export default function User(){
  type data = {
    username:string;
    password: string;
  }
  const{authenticated} = useContext(AuthContext);
  const[user,setUser] = useState('');
const router = useRouter();
//let user =getUser();
useEffect(() => {
  const token = Cookie.get('token');
  const user = Cookie.get('user')
  if(!token){
      router.push('/login')
  }
   setUser(user);
   
})

  const[page,changepage] = useState(1);
  const change = (number: number) => {
   if(number === 1){
     changepage(1);
   }
   if(number === 2){
    changepage(2);
  }
  if(number === 3){
    changepage(3);
  }
  }
  
  return (
    
    <div className={styles.container}>
      <Head>
        <title>User</title>
        </Head>
      
      <div className={styles.header}>
        <Header/>
      </div>
      <div className={styles.banneravatar}>
        <div className={styles.banner}>
          <div className={styles.avatar}>
          <input
        accept="image/*"
  
        id="contained-button-file"
        multiple
        type="file"
      />
          </div>       
        </div>
        <div className={styles.userinfo}>
          <h2>{user}</h2>
          <p><span>@{user}</span></p>
        </div>
        <div>
        <hr className={styles.line}/>
          <div className={styles.atividades}>
           {atividades.map((item,index) =>{
             return(
                <button key={index} onClick={() => change(item.number)}>
                  <span >{item.title}</span>
                </button>
             )
           })}
          </div>
         
          <div className={styles.currentpage}>
          <h1>{page}</h1>
          </div>
          <div></div>
        </div>

      </div>
      <div className={styles.other}></div>
     
     
    </div>
     

  )









          
}