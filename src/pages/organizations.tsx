import Orgs from '../Components/OrgCards';
import Header from '../Components/Header';
import styles from './styles/organizations.module.scss'
import useSWR from 'swr';
import { api } from '../../services/api';
import Cookies from 'js-cookie';
import React from 'react';
import {Token,userProps,listuserProps} from '../types';
import jwt_decode from "jwt-decode"


async function fetcher(path: string): Promise<listuserProps> {
    const token: Token = Cookies.getJSON('token')
    return await api.post(path, token).then(response => response.data)
}




export default function Organizations() {

    const { data, error } = useSWR(`users/listorg`, fetcher);
    const token: Token = jwt_decode(Cookies.getJSON('token'));
    
    if (error) { return (<div>error</div>) }
    if (!data) return <div>Loading</div>
    console.log(data)

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Header />
            </div>

            
                <div className={styles.orgs}>
                    {
                        data.map((organization: userProps, index, array) => {

                            if (organization.username !== token.iss)
                                return (

                                    <Orgs {...organization} key={index} />

                                )
                        })
                    }
                </div>
            
        </div>
    )
}