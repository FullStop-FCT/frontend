import Head from "next/head";
import NavBar from '../NavBar';
import Footer from '../Footer';
import styles from './styles.module.scss';
import Link from 'next/link';


export default function Confirmacao(props) {

  const res = props.response.status;
  const message = props.response.data;

  return (
    <div>
        <Head>
            <title>Confirmação de Email</title>
        </Head>

        <NavBar/>

        {res == 200 ?
            <div className={styles.bg}>
              <h1>O seu email foi confirmado com sucesso.</h1>
              <Link href='/login'> Seguir para a página de login.</Link>
            </div>

          : message == 'enabled' ?

            <div className={styles.bg}>
              <h1>Este email já foi confirmado.</h1>
              <Link href='/login'> Seguir para a página de login.</Link>
            </div>

          :

            <div className={styles.bg}>
              <h1>Ocorreu um erro na confirmação do email, por favor tente novamente. Se o problema persistir contate a nossa equipa.</h1>
              <Link href='/registeruser'><a> Seguir para a página de registo.</a></Link>
            </div>
        } 
        <Footer />
    </div>
  )
}