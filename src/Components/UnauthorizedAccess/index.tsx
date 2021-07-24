import Head from 'next/head';
import Link from 'next/link'
import styles from './styles.module.scss'

export default function Error() {

    return (
        <div className={styles.container}>
            <Head>
                <title>Acesso Proibido</title>
            </Head>

            <h1>Acesso Proibido</h1>

            <Link href='/'><a className={styles.link}>Regressar à página inicial</a></Link>
        </div>
    )
}