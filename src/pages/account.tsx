import Info from '../Components/EditInfo'
import Header from '../Components/Header'
import styles from './styles/base.module.scss'

export default function AccountDetails() {

    return(
        <div className={styles.Container}>
            <div className={styles.Header}>
                <Header/>
            </div>
            <div className={styles.Feed}>
                <Info/>
            </div>
        </div>
    ) ;
}