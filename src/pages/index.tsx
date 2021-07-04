import styles from "./styles/index.module.scss";
import NavBar from '../Components/NavBar'
import Head from "next/head";
import Contato from '../Components/Contato';
import Footer from '../Components/Footer';
import Sobre from '../Components/Sobre';
import Cookie from 'js-cookie'
import Link from 'next/link';
import { useEffect } from "react";
export default function Home() {


  return (
    <div>
      <Head>
        <title>Home Page</title>
      </Head>
      <NavBar />
      <div className={styles.introContainer}>
        <div className={styles.div1image}>
          <img src="/pessoas-parque.png" alt="Pessoas no parque" />
        </div>

        <div className={styles.divIntro}>
          <h1><span>Bem vindos à<br /> Helpin’Hand</span></h1>

          <p>Foco na sua essência</p>
        </div>

      </div>

      <Sobre />

      <Contato />
      <div className={styles.footer}><Footer></Footer></div>





    </div>
  )
}
