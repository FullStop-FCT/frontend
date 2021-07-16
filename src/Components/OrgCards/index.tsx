import Header from '../Header';
import styles from './styles.module.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image'
import { api } from '../../../services/api';
import { BsFillPersonFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";

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

    console.log("orgs" + orgs)
    return (

        <div className={styles.cardcontainer}>
            
            <div className={styles.avatar_background}>

                <div className={styles.avatar}>
                    <Image
                        loader={myLoader}
                        src='me.png'
                        placeholder="blur"
                        width={100}
                        height={100}
                        className={styles.image}
                    />
                </div>
            </div>

            <h2 className={styles.org_name}>{orgs.username}</h2>

            <div className={styles.info}>
                <a className={styles.info_text}><BsFillPersonFill className={styles.icon}/>{orgs.followers}</a> 
                <br/>
                <a className={styles.info_text}><IoLocationSharp className={styles.icon}/>{orgs.location}</a>
            </div>

            <div className={styles.buttons}>


                <h1 className={styles.follow_button}>
                    {
                            following ? 'Seguindo' : 'Seguir'
                    }
                </h1>
                <h1 className={styles.message_button}>Contatar</h1>
                
            </div>           
        </div>
    )
}