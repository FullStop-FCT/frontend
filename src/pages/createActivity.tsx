import Activity from '../Components/Activities'
import Header from '../Components/Header'
import styles from './styles/createactivity.module.scss'
import Head from "next/head";

export default function Create_Activity() {

    return (
        <div className={styles.container}>
            <Head>
                <title>Criar Atividade</title>
            </Head>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.activityContainer}>
                <Activity />
            </div >

        </div >
    );
}