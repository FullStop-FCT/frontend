import Activity from '../Components/Activities'
import Header from '../Components/Header'
import styles from './styles/base.module.scss'

export default function Create_Activity() {

    return (
        <div className={styles.Container}>
            <div className={styles.Header}>
                <Header/>
            </div>
            <div className={styles.Feed}>
                <Activity />
            </div>
        </div>
    );
}