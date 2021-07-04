import Orgs from '../Components/OrgCards';
import Header from '../Components/Header';
import styles from './styles/organizations.module.scss'



export default function Organizations() {

    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
    document.head.appendChild(styleLink);


    return (
        <div className={styles.container}>
            <div className={styles.header}>
            <Header/>
            </div>

            <div className={styles.orgs}>
                <Orgs/>
            </div>
        </div>
        )
}