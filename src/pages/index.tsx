import styles from "./styles/index.module.scss";
import NavBar from '../Components/NavBar'
import Head from "next/head";
import Contato from '../Components/Contato';
import Footer from '../Components/Footer';
import Sobre from '../Components/Sobre';


export default function Home() {


  return (
    <div>
      <Head>
        <title>Helping XPerience</title>
      </Head>
      <NavBar />
      <div className={styles.introContainer} id="top">
        <div className={styles.div1image} >
          <img src="/pessoas-parque.png" alt="Pessoas no parque" />
        </div>

        <div className={styles.divIntro}>
          <h1><span>Helping XPerience</span></h1>

          <p>Foco na sua essência</p>
        </div>

      </div>

      <div id="sobre">
        <Sobre />
      </div>

      <div className={styles.contacts} id="contatos">
        <Contato />
      </div>
      <div className={styles.footer}><Footer></Footer></div>

    </div>
  )
}
