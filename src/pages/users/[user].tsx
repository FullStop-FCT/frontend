import styles from '../styles/users.module.scss'
import  Head  from "next/head"
import { useEffect, useState } from 'react'
import {atividades} from './atividades';
import {AuthContext} from '../../Context/AuthContext';
import React, {useContext} from 'react'
import {useRouter} from 'next/router'
import Cookie from 'js-cookie'
import Header from '../../Components/Header'
import { api } from '../../../services/api';

type userProps = {
  username: string;
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


export async function getServerSideProps() {
  // Fetch data from external API
  const token = Cookie.get('token')
  const user = Cookie.get('user');
  console.log('loading');
  let data: userProps;
  if(token){
    await api.post(`users/get/${user}`)
    .then( function (response) {
      console.log(response);
      data = response.data;
    }).catch(function(error){
      console.log(error);
        return {props: {ok:false, reason:"asdasd"}};
    })
  // Pass data to the page via props
  return { props:  {data}  }
}
}

export default function User({data}){
  type data = {
    username:string;
    password: string;
  }
  const{authenticated} = useContext(AuthContext);
  const[user,setUser] = useState('');
const router = useRouter();




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