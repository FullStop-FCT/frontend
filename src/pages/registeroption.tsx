import styles from './styles/login.module.scss'
import  Head  from "next/head";
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
export default function Login(){
  //css por fazer
  return(
    <div >
    <Head>
        <title>Register</title>
      </Head>
      <NavBar/>
      <div>
        <h1>Escolha uma categoria</h1>
        <div>
         <a><img src="/voluntariado.png"></img></a> 
        </div>
        <div>
        <a><img  src="/organizacao.png"></img></a> 
        </div>
        
      </div>
         
     
      
      <Footer/>
    </div>






  )

}