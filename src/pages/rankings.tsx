import Header from '../Components/Header';
import styles from './styles/rankings.module.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

type Token = {
    username: string,
    tokenID: string,
    role: string,
    creationData: number,
    expirationData: number
}

export default function Rankings() {

    const token: Token = Cookies.getJSON('token');

    const [users, setUsers] = useState([]);

    useEffect( () => {
        axios.post('https://helpinhand-318217.ey.r.appspot.com/rest/users/user/hours', token)
            .then(response => { setUsers(response.data)})
    }, [])

    return (
        <div className={styles.container}>

            <div className={styles.header}>
                <Header/>
            </div> 

            <div className={styles.imagediv}>
                <div className={styles.image1}>
                    <a href="/rankings/users"><img src="/individuo.png"></img></a>
                    <h1>Voluntários</h1>
                </div>
                <div className={styles.image2}>
                    <a href="/rankings/organizacoes"><img src="/grupo.png"></img></a>
                    <h1>Organizações</h1>
                </div>
            </div>
        </div>
    )

}