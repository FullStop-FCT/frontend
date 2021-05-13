import styles from './styles/login.module.scss'
import  Head  from "next/head";
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
export default function Login(){
  return(
    <div >
    <Head>
        <title>Login</title>
      </Head>
      <NavBar/>
      
          <div className={styles.login}>
        <h1>Login</h1>
        <form>
        
        <input type="text" name="name" placeholder="Email/Username" id="email" /><p/>
       
        <input type="password" name="password" placeholder="Password" id="password" /><p/>
        
        </form>
        <button>Login</button>
       
      

      </div>
     
      
      <Footer/>
    </div>






  )

}