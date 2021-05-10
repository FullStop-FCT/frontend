import styles from "./styles.module.scss";





export default function Contato(){
  
  
  return (
    <div className={styles.Container}>
      <div className={styles.contato}>
        <h1>Contato</h1>
      <p>fullstophh@gmail.com</p>
      <p>Tel: +351 000000000</p>
      </div>

      <div className={styles.feedback}>
        <h1>Dê-nos um feedback</h1>
        <form>
        
        <input type="text" name="name" placeholder="Nome" id="name" /><p/>
        <input type="text" name="email" placeholder="Email" id="email" /><p/>
        <textarea placeholder="Mensagem" id="mensagem"></textarea>
        </form>
        <button>Enviar</button>
       
      </div>
     

      
      


      
    </div>
  )










}