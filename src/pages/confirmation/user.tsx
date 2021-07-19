import Head from "next/head";
import NavBar from '../../Components/NavBar';
import Footer from '../../Components/Footer';
import styles from '../styles/emailconfirmation.module.scss';



export default function Confirmacao() {

  const handle = () => <div className={styles.bg}><h1>Boas</h1></div> ;

  return (
    <div>
        <Head>
            <title>Register</title>
        </Head>

        <NavBar/>

        <div className={styles.bg}>
          <h1>OLA</h1>
          <button onClick={handle}>
            Teste
          </button>
        </div>

        <Footer />
    </div>
  )
}