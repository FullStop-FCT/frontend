import styles from "./styles.module.scss"

export default function Sobre(){
  return(
    <div className={styles.container1}>
      <div className={styles.container2}>
        <h1>Mais Sobre Nós</h1>
        <p>O Helpin'Hand é um Programa de voluntariado especial que visa envolver e inspirar. Desde 2021, nós possibilitamos a inúmeros participantes<br/> experiências envolventes que eles levam consigo para o resto de suas vidas. Com uma série de programas disponíveis para diferentes níveis<br/> de habilidades e interesses, há algo para todos desfrutarem.</p>
        <button>Inscrever-se</button>
      </div>
    </div>

  )
}