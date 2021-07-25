import Header from '../Header';
import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image'
import { api } from '../../../services/api';
import { BsFillPersonFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { userProps, Token } from "../../types"
import jwt_decode from "jwt-decode"
import { useRouter } from 'next/router';


export default function Organizations(orgs: userProps) {

    const router = useRouter();

    const [following, setFollowing] = useState<boolean>();

    useEffect( () => {
        console.log("following" + following)
    }, [following])

    const token = Cookies.getJSON('token')
    const config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
    let decodedToken: Token = jwt_decode(Cookies.getJSON('token'));
    useEffect(() => {
        api.get(`users/isfollowing/${orgs.username}` ,config).then(response => setFollowing(response.data))
    }, [])

    async function follow(orgname) {
        const token: Token = Cookies.getJSON('token')
        const config = {
            headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json'
            }
          }
        if (!following) {
            await api.post(`users/follow/${orgname}`, decodedToken.iss,config).then(response => console.log(response.data))
            setFollowing(true)
        }
        else {
            await api.post(`users/unfollow/${orgname}`, decodedToken.iss,config).then(response => console.log(response.data))
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

            <h2 className={styles.org_name}>{orgs.name}</h2>

            <div className={styles.info}>
                <a className={styles.info_text}><BsFillPersonFill className={styles.icon}/>{orgs.followers}</a> 
                <br/>
                <a className={styles.info_text}><IoLocationSharp className={styles.icon}/>{orgs.location}</a>
            </div>

            <div className={styles.buttons}>


                <h1 onClick={() => follow(orgs.username)}className={styles.follow_button}>
                    {
                            following ? 'Seguindo' : 'Seguir'
                    }
                </h1>
                <h1 onClick={() => router.push(`/${orgs.username}`)} className={styles.message_button}>Ver</h1>
                
            </div>           
        </div>
    )
}