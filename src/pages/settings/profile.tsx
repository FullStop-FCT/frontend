import styles from '../styles/editprofile.module.scss'
import Head from "next/head"
import { useEffect, useState } from 'react'
import { atividades } from '../../Components/atividades';
import { AuthContext } from '../../Context/AuthContext';
import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Header from '../../Components/Header'
import { api } from '../../../services/api';
import useSWR from 'swr'
import SessionOf from '../../Components/SessionOf'
import EditInfo from '../../Components/EditInfo'
import Image from 'next/image'
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
  kind: string,

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




export default function User() {

  const { subEdit, setSubEdit, authenticated } = useContext(AuthContext);
  const router = useRouter();

  const [page, changepage] = useState(1);

  const change = (number: number) => {
    if (number === 1) {
      changepage(1);
    }
    if (number === 2) {
      changepage(2);
    }
    if (number === 3) {
      changepage(3);
    }
  }



  const token: Token = Cookies.getJSON('token')
  const { data, error } = useSWR(`users/get/${token.username}`, fetcher);

  let user: userProps = data;
  console.log(data)
  if (error) { return <SessionOf /> }
  if (!data) return <div>loading...</div>

  const myLoader = () => {
    return `https://storage.googleapis.com/imagens-helpin-hand/${token.username}.jpg`
  }



  return (

    <div>
      <div className={styles.container}>
        <Head>
          <title>User</title>
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
                width={170}
                height={170}
                className={styles.image}
              />
            </div>
          </div>
          <div className={styles.userinfo}>
            <h2>{user.name}</h2>
            <p><span>@{user.username}</span></p><br />
            <button>Edit info</button>


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
              <h1>{page}</h1>
            </div>
            <div></div>
          </div>

        </div>
        <div className={styles.other}></div>
      </div>
      <div className={styles.settingsTitle}>
        <h1 >Edit user</h1>
        <button onClick={() => router.push(`/${token.username}`)}><p>&#10006;</p></button>
      </div>
      <div className={styles.settings}>
        <EditInfo {...user} />


      </div>




    </div>


  )












}