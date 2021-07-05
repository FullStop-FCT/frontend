import styles from '../../styles/activity.module.scss'
import Header from '../../../Components/Header'

export default function Activity() {


    return (
        <div className={styles.container}>

            <div className={styles.header}>
                <Header />
            </div>

            <div className={styles.organizer}>

                <div className={styles.org_info}>
                    <div className={styles.image} />
                    <a href="">Nome</a>
                </div>

                <div className={styles.details}>
                    <p>Localização</p>
                    <p>Seguidores</p>
                </div>
            </div>
        </div>
    )
}