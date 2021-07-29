import Orgs from '../Components/OrgCards';
import Header from '../Components/Header';
import styles from './styles/organizations.module.scss'
import useSWR from 'swr';
import { api } from '../../services/api';
import Cookies from 'js-cookie';
import React from 'react';
import {Token,userProps,listuserProps} from '../types';
import jwt_decode from "jwt-decode"
import Loading from '../Components/Loading';
import Head from "next/head";


async function fetcher(path: string): Promise<listuserProps> {
    
    const token: Token = Cookies.getJSON('token')
    const config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
    
    return await api.get(path, config).then(response => response.data)
}


export default function Organizations() {

    const decodedToken: Token = jwt_decode(Cookies.getJSON('token'));
    const { data, error } = useSWR(`users/listorg`, fetcher);
    //console.log(data)
    if (error) { return (<div>error</div>) }
    if (!data) return <Loading />
    //console.log(data)

    return (
        <div className={styles.container}>
            <Head>
                <title>Organizações</title>
            </Head>
            <div className={styles.header}>
                <Header />
            </div>
                <div className={styles.orgs}>
                    {
                        data.map((organization: userProps, index, array) => {

                            if (organization.username !== decodedToken.iss)
                                return (
                                    <Orgs {...organization} key={index} />
                                )
                        })
                    }
                </div>
            
        </div>
    )
}