import styles from "./styles.module.scss";
import React from 'react';
//import emailjs from 'emailjs-com';

export default function Contato() {

  function sendEmail(e) {

  }

  return (
    <div className={styles.Container}>
      <div className={styles.contato}>
        <h1>Contato</h1>
        <p>fullstophh@gmail.com</p>
      </div>

      <div className={styles.feedback}>
        <h1>Fale connosco</h1>
        <form onSubmit={sendEmail}>
          <input type="text" name="name" placeholder="Nome" /><p />
          <input type="text" name="email" placeholder="Email" /><p />
          <input type="text" name="assunto" placeholder="Assunto" /><p />
          <textarea name="mensagem" placeholder="Mensagem" ></textarea>
        </form>
        <input type="submit" value="Enviar" /><p />

      </div>

    </div>
  )
}