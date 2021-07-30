import styles from '../../pages/styles/users.module.scss';
import Head from "next/head"
import { useState } from 'react'
import { atividades } from '../../Components/atividades';
import React, { useEffect } from 'react'
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


export default function Profile() {

  const router = useRouter();

  async function suspend(user) {

    await api.post(`backoffice/suspend`,user, config).then(() => location.reload())
  }
  
  async function remove(user) {
  
    await api.post(`backoffice/delete`, user, config).then(() => router.push('/home'))
  }

  async function enable(user) {
    
    await api.post(`backoffice/enable`, user, config).then(() => location.reload())
  }
  
  const [page, changepage] = useState(1);
  const [number, setNumber] = useState(1);
  const [suspended, setSuspended] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [user, setUser] = useState<userProps>(null);

  function checkState(state) {

    if (state == 'DISABLED')
      setDisabled(true);
  
    else if (state == 'SUSPENDED')
      setSuspended(true);

    else if (state == 'ENABLED')
      setEnabled(true);
  }

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

    let imageLoader = null;
    
    let token: Token = null;

    try{ 
      token = jwt_decode(Cookies.getJSON('token'));
    }
    catch(error){ 
      window.location.href = '/login';
    }

    let username = window.location.pathname.replace('/', '');

    useEffect(() => {

      async function fetcher() {
        await api.get(`users/get/${username}`,config)
          .then(function(response) { 
            checkState(response.data.state);
            setUser(response.data)});
         };

      fetcher();

    }, []);

    imageLoader = () => {
      return `https://storage.googleapis.com/helpinhand-318217.appspot.com/${user.image}`
    }

    let role = token.role;


    if(!user) return null;

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
                <button onClick={ () => router.push(`report/${username}/report`)}>Denunciar</button>
                :
                <div>
                  {user.role == 'USER' ?

                  <div>
                    {suspended ?

                    <button onClick={() => enable(username)}>Ativar Conta</button>

                    :disabled ?

                    <button onClick={() => enable(username)}>Ativar Conta</button>

                    :enabled ?

                    <button onClick={() => suspend(username)}>Suspender Conta</button>

                    :
                    
                    null
                    }
                  </div>

                  :

                  null
                  }
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