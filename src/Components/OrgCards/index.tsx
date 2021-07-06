import Header from '../Header';
import styles from './styles.module.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image'

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

export default function Organizations(orgs: userProps) {
    const myLoader = () => {

        { return `https://storage.googleapis.com/helpinhand-318217.appspot.com/${orgs.image}` }

    }

    return (

        <div className={styles.cardcontainer}>
            <div className={styles.avatar}>
                <Image
                    loader={myLoader}
                    src='me.png'
                    placeholder="blur"
                    width={70}
                    height={70}
                    className={styles.image}
                />
            </div>
            <div className={styles.name}>
                <h2>{orgs.username}</h2>
            </div>
            <div className={styles.follow}>
                <button>
                    Seguir
                </button>
            </div>

        </div>
    )
}