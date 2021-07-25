import Cookies from "js-cookie";
import Head from "next/head";
import React from "react";
import useSWR from "swr";
import { api } from "../../../services/api";
import Header from "../../Components/Header";
import Loading from "../../Components/Loading";
import SessionOf from "../../Components/SessionOf";
import styles from "./styles.module.scss"

type Token = {
  username: string,
  tokenID: string,
  role: string,
  creationData: number,
  expirationData: number
}
async function fetcher(path: string) {
  const token: Token = Cookies.getJSON('token')

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
  return await api.get(path, config).then(response => response.data);
}

export default function Following() {

  const { data, error } = useSWR("users/get/followings", fetcher)
  if (!data) return <Loading />
  if (error) { return <SessionOf /> }
  let following: string[] = data;

  return (
    <div className={styles.container}>
      <Head>
        <title>following</title>
      </Head>

      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.cont}>
        <div className={styles.divfollow}>
          <h1>Seguindo</h1>
          {following.map((fl, index) => {
            return (
              <p key={index}>{fl}</p>
            )
          })}
        </div>
      </div>





    </div>

  )
}