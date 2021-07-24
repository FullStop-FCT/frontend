import styles from '../../pages/styles/users.module.scss';
import Head from "next/head"
import { useState } from 'react'
import { atividades } from '../../Components/atividades';
import { AuthContext } from '../../Context/AuthContext';
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
import ActivitiesDoneList from '../../Components/ActivitiesDoneList';
import { GoLocation } from 'react-icons/go'
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import Link from 'next/link';
import jwt_decode from "jwt-decode"
import {Token,userProps} from '../../types';

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

    const router = useRouter();
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

    let username = window.location.pathname.replace('/', '')
 
    const token: Token = jwt_decode(Cookies.getJSON('token'));
  
    if(!token){
        window.location.href = '/login';
    }

    let user: userProps = null;

    let { data, error } = useSWR(`users/user`, fetcher);
    user = data;
 
   
    if (!data) return <Loading />
    if (error) {  window.location.href = '/login'; }

    const imageloader = () => {
      return `https://storage.googleapis.com/helpinhand-318217.appspot.com/${user.image}`
    }

    return(
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
                        loader={imageloader}
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
                        <p><span>@{user.username}</span></p>
                        <br />
                        <p><GoLocation /> {user.location}</p>
                        <p><AiOutlineMail /> {user.email}</p>
                        <p><AiOutlinePhone /> {user.phoneNumber}</p>
                        <Link href={`following/${token.iss}`}><a className={styles.link}>Seguindo: {user.followings}</a></Link>
                        <a> Seguidores: {user.followers}</a>
                        <br />
                        <br />
                        <button className={styles.infobutt} onClick={() => router.push('/settings/profile')}>Edit info</button>
                        <button className={styles.certificate_button} onClick={() => router.push('/certificate')}>Pedir Certificado</button>
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
                            <ActivitiesToDoList /> : <></>
        
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
