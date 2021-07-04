import Activity from '../Components/Activities'
import Header from '../Components/Header'
import styles from './styles/createactivity.module.scss'

export default function Create_Activity() {

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.activityContainer}>
                <h1>Criar Atividade</h1>
                <Activity />
            </div >

        </div >
    );
}