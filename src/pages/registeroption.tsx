import styles from './styles/registeroption.module.scss'
import Head from "next/head";
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
export default function Login() {
  //css por fazer
  return (
    <div >
      <Head>
        <title>Register</title>
      </Head>
      <NavBar />
      <div className={styles.h1}> <h1>Escolha uma categoria</h1></div>
      <div className={styles.imagediv}>

        <div className={styles.image1}>
          <a href="/registeruser"><img src="/voluntariado.png"></img></a>
          <h1>Voluntariado</h1>
        </div>
        <div className={styles.image2}>
          <a href="/registerorg"><img src="/organizacao.png"></img></a>
          <h1>Organização</h1>
        </div>

      </div>



      <Footer />
    </div>






  )

}