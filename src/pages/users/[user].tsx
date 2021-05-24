import styles from '../styles/users.module.scss'
import  Head  from "next/head"
import { useEffect, useState } from 'react'
import {atividades} from '../../Components/atividades';
import {AuthContext} from '../../Context/AuthContext';
import React, {useContext} from 'react'
import {useRouter} from 'next/router'
import Cookies from 'cookie'
import Header from '../../Components/Header'
import { api } from '../../../services/api';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

type userProps = {
  username: string;
  name: string;
  email: string;
  profile: string;
  phoneNumber: string;
  mobileNumber: string;
  address: string;
  location: string;
  postalCode: string;
  birthday: string;
  gender: string;
  
}
type Token = {
  username: string,
   tokenID: string,
    role: string,
     creationData: number, 
     expirationData: number
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

  var user : userProps
    console.log('asouidbasiou')
   await api.post(`users/get/${token.username}`,token).then((response) => {
    console.log(response)
    user = response.data
  }).catch((error) => {
    console.log(error);
  
  })
  
 
  

return { 
  props: user
}

}

export default function User(props: userProps){
  const{subEdit,setSubEdit} = useContext(AuthContext);
  console.log(props)
  const router = useRouter();
  if(JSON.stringify(props) === '{}'){
    router.push('/login');
  }
  const currentUser: userProps = props;
  type data = {
    username:string;
    password: string;
  }
  const{authenticated} = useContext(AuthContext);
  const[user,setUser] = useState('');




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
          
          </div>       
        </div>
        <div className={styles.userinfo}>
          <h2>{currentUser.name}</h2>
          <p><span>@{currentUser.username}</span></p><br/>
          <button onClick={()=>setSubEdit(!subEdit)}>Edit info</button>
          {
              subEdit ? <h1>oi</h1> : <></>
            }
          
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