import Header from '../Header';
import styles from './styles.module.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image'
import { api } from '../../../services/api';

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


export default function Organizations(orgs: userProps) {

    const [following, setFollowing] = useState(false);

    const token: Token = Cookies.getJSON('token')
    useEffect(() => {
        api.post(`users/isfollowing/${orgs.username}`, token).then(response => setFollowing(response.data))
    }, [])

    async function follow(orgname) {
        const token: Token = Cookies.getJSON('token')
        if (!following) {
            await api.post(`users/follow/${orgname}`, token).then(response => console.log(response.data))
            setFollowing(true)
        }
        else {
            await api.post(`users/unfollow/${orgname}`, token).then(response => console.log(response.data))
            setFollowing(false)
        }
    }


    const myLoader = () => {

        { return `https://storage.googleapis.com/helpinhand-318217.appspot.com/${orgs.image}` }

    }

    return (

        <div className={styles.cardcontainer}>
            <div className={styles.avatarbackground}>

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
            </div>

            <div className={styles.buttons}>
                <div className={styles.follow_button}>
                    <h2>{orgs.username}</h2>
                </div>
                <div className={styles.follow}>
                    <button onClick={() => follow(orgs.username)}>
                        {
                            following ? 'Seguindo' : 'Seguir'

                        }
                    </button>
                </div>

                <div className={styles.message_button}>
                    <button onClick={() => true}>               {/* TODO -----> Editar o onclick para enviar mensagem */}
                        Enviar Mensagem
                    </button>
                </div>
            </div>           
        </div>
    )
}