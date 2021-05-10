import styles from './styles/register.module.scss'
import  Head  from "next/head";
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
export default function Login(){
  return(
    <div>
      <Head>
        <title>Register</title>
      </Head>
      <NavBar/>
      
      <div className={styles.login}>
        <h1>Inscreva-se</h1>
        <form>
        
        <input type="text" name="name" placeholder="Email" id="email" /><p/>
        <input type="text" name="username" placeholder="Username" id="username" /><p/>
        <input type="password" name="password" placeholder="Password" id="password" /><p/>
        <input type="password" name="confirmpassword" placeholder="Confirm Password" id="cpassword" /><p/>
        </form>
        <button>Inscrever-se</button>
       
      
      </div>
      <Footer/>
    </div>






  )

}