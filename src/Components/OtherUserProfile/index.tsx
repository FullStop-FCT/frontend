import styles from '../../pages/styles/users.module.scss';
import Head from "next/head"
import { useState } from 'react'
import { atividades } from '../../Components/atividades';
import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Header from '../../Components/Header'
import { api } from '../../../services/api';
import useSWR from 'swr'
import SessionOf from '../../Components/SessionOf'
import Image from 'next/image'
import Loading from '../../Components/Loading'
import ActivitiesToDoList from '../../Components/ActivitiesToDoList';
import OwnActivitiesList from '../../Components/OwnActivitiesList';
import { GoLocation } from 'react-icons/go'
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import Link from 'next/link';
import jwt_decode from "jwt-decode"
import { Token, userProps } from '../../types';


async function fetcher(path: string): Promise<userProps> {
    const token: Token = Cookies.getJSON('token')
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    return await api.get(path,config).then(response => response.data);
}




export default function Profile() {
  
  const [page, changepage] = useState(1);
  const [number, setNumber] = useState(1);

  async function change(number: number) {

    if (number === 1) {
      setNumber(1);
      changepage(1);
    }
    if (number === 2) {
      setNumber(2);
      changepage(2);
    }
    if (number === 3) {
      setNumber(3);
      changepage(3);
    }
  }
    
    let username = window.location.pathname.replace('/', '');
    let user: userProps = null;
    let imageLoader = null;
    
    let token: Token = null;

    try{ 
      token = jwt_decode(Cookies.getJSON('token'));
    }
    catch(error){ 
      window.location.href = '/login';
    }

    let { data, error } = useSWR(`users/get/${username}`, fetcher);
    user = data;
    if (error) { return <SessionOf /> }
    if (!data) return <Loading />
    imageLoader = () => {
      return `https://storage.googleapis.com/helpinhand-318217.appspot.com/${user.image}`
    }

    let role = token.role;

    return (

        <div className={styles.container}>
          <Head>
            <title>{token.iss}</title>
          </Head>
  
          <div className={styles.header}>
            <Header />
          </div>
          <div className={styles.banneravatar}>
  
            <div className={styles.banner}>
              <div className={styles.avatar}>
                <Image
                  loader={imageLoader}
                  src="me.png"
                  placeholder="blur"
                  width={200}
                  height={200}
                  className={styles.image}
                />
              </div>
            </div>
            <div className={styles.userinfo}>
              <h2>{user.name}</h2>
              <p><span>@{user.username}</span></p><br />

              {(role == 'USER') ?
                <button >Denunciar</button>
                :
                <div>
                  <button>Suspender Conta</button>
                  <br/>
                  <button>Eliminar Conta</button>
              </div>
              }
  
            </div>
            <div>
              <hr className={styles.line} />
              <div className={styles.atividades}>
                {atividades.map((item, index) => {
                  return (
                    <button key={index} onClick={() => change(item.number)}>
                      <span >{item.title}</span>
                    </button>
                  )
                })}
              </div>
  
              <div className={styles.currentpage}>
  
              </div>
              <div></div>
            </div>
  
          </div>
          <div className={styles.other}></div>
  
        </div>
      )
}