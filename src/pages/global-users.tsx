import  {Token } from '../types';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import UnauthorizedAcess from '../Components/UnauthorizedAccess';
import styles from './ranking/rankingtables.module.scss';
import Header from '../Components/Header';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { listuserProps } from '../types';
import { useRouter } from 'next/router';

export default function Users() {

    const router = useRouter();

    const token = Cookies.getJSON('token');
    const decoded_token: Token = jwt_decode(Cookies.getJSON('token'))

    let role = decoded_token.role;

    if (role == 'USER')
        return (<div><UnauthorizedAcess/></div>)

    const config = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }

    return (
        <div className={styles.container}>

            <div className={styles.header}>
                <Header/>
            </div> 


            <div className={styles.options}>
                <button onClick={() => router.push('/global-users/reported') } 
                    className={styles.options_buttons}>Contas denunciadas</button>

                <button onClick={() => router.push('/global-users/disabled') } 
                    className={styles.options_buttons}>Contas inativas</button>

                <button onClick={() => router.push('/global-users/suspended') } 
                    className={styles.options_buttons}>Contas suspensas</button>
            </div>
                
        </div>
    )
}