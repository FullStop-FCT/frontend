import styles from "./styles.module.scss";
import React from 'react';

export default function Contato() {

  async function handleSubmit(e) {
    //e.preventDefault(); //prevents the form from submitting to the browser

    const formData = {};

    //accesses the form values which do not come in an array and so therefore we wrap it with Array.from
    //then we can iterate it and store it in formData
    Array.from(e.currentTarget.elements).forEach(field => { formData[field.name] = field.value }); 

    fetch('/api/mail', {
      method: 'post',
      body: JSON.stringify(formData)
    });
  }

  return (
    <div className={styles.Container}>
      <div className={styles.contato}>
        <h1>Contato</h1>
        <p>fullstophh@gmail.com</p>
      </div>

      <div className={styles.feedback}>
        <h1>Fale connosco</h1>
        <form method="post" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Nome" /><p />
          <input type="text" name="email" placeholder="Email" /><p />
          <input type="text" name="assunto" placeholder="Assunto" /><p />
          <textarea name="mensagem" placeholder="Mensagem" ></textarea>
          <input type="submit" value="Enviar" /><p />
        </form>

      </div>

    </div>
  )
}