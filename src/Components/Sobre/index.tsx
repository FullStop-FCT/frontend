import Link from "next/link"
import React from "react"
import styles from "./styles.module.scss"

export default function Sobre() {
  return (
    <div className={styles.container1}>
      <div className={styles.container2}>
        <h1>Mais Sobre Nós</h1>
        <p>A Helping XPerience é um programa de voluntariado especial que visa a envolver e inspirar. Desde 2021, possibilitamos a inúmeros participantes<br /> experiências envolventes que eles levam consigo para o resto de suas vidas. Com uma série de programas disponíveis para diferentes níveis<br /> de habilidades e interesses, há algo para todos desfrutarem.</p>
        <button><Link href="/registeroption"><a>Inscrever-se</a></Link></button>
      </div>
    </div>

  )
}