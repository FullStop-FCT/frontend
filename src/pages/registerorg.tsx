import styles from './styles/register.module.scss'
import Head from "next/head";
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'

export default function Register() {
  
  return (
    <div>
      <Head>
        <title>Registar Organização</title>
      </Head>
      <NavBar />
      <div className={styles.register}>
        <h1 className={styles.register_org}>Para garantir a legitimidade de todas as organizações presentes no nosso site, este registo é feito manualmente pela nossa equipa após a avaliação da vericidade dos dados entregues.</h1> 
        <br/>
        <h1 className={styles.register_org}>Para iniciar o processo, por favor envie-nos um email para
          <a className={styles.email}>organizacoes@fullstop.website</a>.
        </h1> 
      </div>
      <Footer />
    </div>

  );
}
