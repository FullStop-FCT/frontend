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
import jwt_decode from "jwt-decode"
import { Token, userProps } from '../../types';
import ActivitiesToDoList from '../../Components/ActivitiesToDoList';
import OwnActivitiesList from '../../Components/OwnActivitiesList';
import ActivitiesDoneList from '../../Components/ActivitiesDoneList';
import { GoLocation } from 'react-icons/go'
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'

const token: Token = Cookies.getJSON('token');

const config = {
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  }
}

async function fetcher(path: string): Promise<userProps> {
    return await api.get(path,config).then(response => response.data);
}


export default function Profile() {

  const router = useRouter();

  async function suspend(user) {

    await api.post(`backoffice/suspend`,user, config).then(() => router.push('/home'))
  }
  
  async function remove(user) {
  
    await api.post(`backoffice/delete`, user, config).then(() => router.push('/home'))
  }
  
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
    
    let user: userProps = null;
    let imageLoader = null;
    
    let token: Token = null;

    try{ 
      token = jwt_decode(Cookies.getJSON('token'));
    }
    catch(error){ 
      window.location.href = '/login';
    }

    let username = window.location.pathname.replace('/', '');

    let { data, error } = useSWR(`users/get/${username}`, fetcher);
    user = data;

    console.log(user);

    if (error) { return <SessionOf /> }
    if (!data) return <Loading />
    imageLoader = () => {
      return `https://storage.googleapis.com/helpinhand-318217.appspot.com/${user.image}`
    }

    let role = token.role;

    return (

        <div className={styles.container}>
          <Head>
            <title>{user.name}</title>
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
              <p><GoLocation /> {user.location}</p>
                        <p><AiOutlineMail /> {user.email}</p>
                        <p><AiOutlinePhone /> {user.phoneNumber}</p><br/>
              {
                user.profile !== 'PUBLIC' && (<h4>Esta conta é privada</h4>)
              },
              {(role == 'USER') ?
                <button onClick={ () => router.push(`reportpage/${username}/report`)}>Denunciar</button>
                :
                <div>
                  <button onClick={() => suspend(username)}>Suspender Conta</button>
                  <br/>
                  <button onClick={() => remove(username)}>Eliminar Conta</button>
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
              <div>
                        {
                        number === 1 ?
                          
                            <ActivitiesToDoList />
                        
                             : <></>
        
                        }
                        {
                        number === 2 ?
                            <OwnActivitiesList /> : <></>
        
                        }
                        {
                        number === 3 ?
                            <p><ActivitiesDoneList /></p> : <></>
                        }
        
                    </div>
            </div>
  
          </div>
          <div className={styles.other}></div>
  
        </div>
      )
}