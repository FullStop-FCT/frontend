import Orgs from '../Components/OrgCards';
import Header from '../Components/Header';
import styles from './styles/organizations.module.scss'
import useSWR from 'swr';
import { api } from '../../services/api';
import Cookies from 'js-cookie';
import React from 'react';

type userProps = {
    birthday: string;
    email: string;
    name: string;
    profile: string;
    phoneNumber: string;
    mobileNumber: string;
    address: string;
    location: string;
    postalCode: string;
    gender: string;
    username: string;
    points: number;
    kind: string;
    image: string;
}
type Token = {
    username: string,
    tokenID: string,
    role: string,
    creationData: number,
    expirationData: number
}
type listuserProps = userProps[];

async function fetcher(path: string): Promise<listuserProps> {
    const token: Token = Cookies.getJSON('token')
    return await api.post(path, token).then(response => response.data)
}




export default function Organizations() {

    const { data, error } = useSWR(`users/listorg`, fetcher);
    const token: Token = Cookies.getJSON('token')
    if (error) { return (<div>error</div>) }
    if (!data) return <div>Loading</div>
    console.log(data)

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Header />
            </div>
            <React.Fragment>
                <div className={styles.orgs}>
                    {
                        data.map((organization: userProps, index, array) => {

                            if (organization.username !== token.username)
                                return (

                                    <Orgs {...organization} key={index} />

                                )
                        })
                    }
                </div>
            </React.Fragment>
        </div>
    )
}