import styles from '../styles/users.module.scss'
import  Head  from "next/head"
import { useState } from 'react'
import {atividades} from './atividades';
import Footer from '../../Components/Footer';

export default function User(){
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

  console.log(number);

  }


  return (
    <>
    <div className={styles.container}>
      <Head>
        <title>User</title>
        </Head>
      
      <div className={styles.header}>

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
          <h2>FullStop</h2>
          <p><span>@fullstop</span></p>
        </div>
        <div>
        <hr className={styles.line}/>
          <div className={styles.atividades}>
           {atividades.map((item) =>{
             return(
                <button onClick={() => change(item.number)}>
                  <span>{item.title}</span>
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
    <Footer/>
     </>








  )










}