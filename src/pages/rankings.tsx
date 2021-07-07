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

    return (
        <div className={styles.container}>



            <div className={styles.header}>
                <Header />
            </div>


            <div className={styles.options}>
                <div className={styles.title}>
                    <h1>TOP 25</h1>
                </div>
                <div className={styles.imagediv}>

                    <div className={styles.image1}>
                        <a href="/ranking/users"><img src="/individuo.png"></img></a>
                        <h1>Voluntários</h1>
                    </div>
                    <div className={styles.image2}>
                        <a href="/ranking/organizations"><img src="/grupo.png"></img></a>
                        <h1>Organizações</h1>
                    </div>
                </div>
            </div>
        </div>
    )

}