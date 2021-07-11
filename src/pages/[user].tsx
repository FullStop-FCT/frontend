import styles from './styles/users.module.scss'
import Head from "next/head"
import { useEffect, useState } from 'react'
import { atividades } from '../Components/atividades';
import { AuthContext } from '../Context/AuthContext';
import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Header from '../Components/Header'
import { api } from '../../services/api';
import useSWR from 'swr'
import SessionOf from '../Components/SessionOf'
import Image from 'next/image'
import Loading from '../Components/Loading'
import ActivitiesToDoList from '../Components/ActivitiesToDoList';
import OwnActivitiesList from '../Components/OwnActivitiesList';
import { GoLocation } from 'react-icons/go'
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import Link from 'next/link';
type userProps = {
  birthday: string;
  email: string;
  name: string;
  profile: string;
  phoneNumber: string;
  mobileNumber: string;
  address: string;
  location: string;
  postalCode: string;
  gender: string;
  username: string;
  points: number;
  kind: string;
  image: string;
  followers: number,
  followings: number,
}
type Token = {
  username: string,
  tokenID: string,
  role: string,
  creationData: number,
  expirationData: number
}


async function fetcher(path: string): Promise<userProps> {

  const token: Token = Cookies.getJSON('token')
  return await api.post(path, token).then(response => response.data);

}

async function fetcher2(path: string): Promise<userProps> {
  return await api.get(path).then(response => response.data);
}

export default function User() {

  const { subEdit, setSubEdit, authenticated } = useContext(AuthContext);
  const router = useRouter();
  const [listativities, setListativities] = useState([])
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
  console.log(window.location.pathname)
  let username = window.location.pathname.replace('/', '')
  console.log(username)
  const token: Token = Cookies.getJSON('token')
  var myLoader = null;
  let user: userProps = null;



  if (username === token.username) {
    let { data, error } = useSWR(`users/user/`, fetcher);
    user = data;
    console.log(user);
    if (!data) return <Loading />
    if (error) { return <SessionOf /> }
    myLoader = () => {
      return `https://storage.googleapis.com/helpinhand-318217.appspot.com/${user.image}`
    }

    return (

      <div className={styles.container}>
        <Head>
          <title>{token.username}</title>
        </Head>

        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.banneravatar}>

          <div className={styles.banner}>
            <div className={styles.avatar}>
              <Image
                loader={myLoader}
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
            <Link href={`following/${token.username}`}><a className={styles.link}>Seguindo: {user.followings}</a></Link>
            <a> Seguidores: {user.followers}</a>
            <br />
            <br />
            <button className={styles.infobutt} onClick={() => router.push('/settings/profile')}>Edit info</button>
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
                  <p>Ainda Nao disponivel</p> : <></>
              }

            </div>
          </div>

        </div>
        <div className={styles.other}></div>


      </div>
    )
  }

  //quando é outro user 
  else {
    let { data, error } = useSWR(`users/self/${username}`, fetcher2);
    user = data;
    if (error) { return <SessionOf /> }
    if (!data) return <Loading />
    myLoader = () => {
      return `https://storage.googleapis.com/helpinhand-318217.appspot.com/${user.image}`
    }

    return (

      <div className={styles.container}>
        <Head>
          <title>{token.username}</title>
        </Head>

        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.banneravatar}>

          <div className={styles.banner}>
            <div className={styles.avatar}>
              <Image
                loader={myLoader}
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
}