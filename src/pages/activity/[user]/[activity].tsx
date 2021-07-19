import styles from '../../styles/activity.module.scss'
import Header from '../../../Components/Header'
import Cookies from 'js-cookie'
import { api } from '../../../../services/api'
import useSWR from 'swr'
import Loading from '../../../Components/Loading'
import SessionOf from '../../../Components/SessionOf'
import Image from 'next/image'
import MapActivity from '../../../Components/ActivityMap'
import Link from 'next/link'
import { format } from 'date-fns'
import { useState } from 'react'
import { useEffect } from 'react'
import { Token,AtivitiesProps,userProps } from '../../../types'
import jwt_decode from 'jwt-decode'



export default function Activity() {

    let path = window.location.pathname.replace('/', '');
    let path_values: String[] = path.split("/");
    let activityOwner = path_values[1];
    let activityID = path_values[2];

    const [isParticipating, setParticipation] = useState(false);

    async function fetchActivity(path: string): Promise<AtivitiesProps> {
 
        return await api.get(path, config).then(response => response.data)
    }

    async function fetchUser(path: string): Promise<userProps> {
        
        return await api.get(path,config).then(response => response.data)
    }

    const token = Cookies.getJSON('token');
    const config = {
        headers: {
          'Authorization': 'Bearer ' + token ,
          'Content-Type': 'application/json'
        }
      }
    let { data: activity, error: error1 } = useSWR(`activities/get/${activityID}/${activityOwner}`, fetchActivity);
    let { data: user, error: error2 } = useSWR(`users/get/${activityOwner}`, fetchUser);

    useEffect(() => {

        api.get(`activities/isjoined/${activityID}`, config).then(response => setParticipation(response.data))
    }, [])

    async function handleClick() {
        let decodetoken: Token = jwt_decode(token);
        let user =  decodetoken.iss;
        console.log(decodetoken.iss)
        if (!isParticipating) {
            await api.post(`activities/join/${activityID}/${activityOwner}`,user,config).catch(error => console.log(error));
            setParticipation(true);
        }
        else {
            await api.post(`activities/leave/${activityID}/${activityOwner}`,user,config);
            setParticipation(false);
        }
    }

    if (!activity || !user) return <Loading />
    if (error1 || error2) { return <SessionOf /> }

    const myLoader = () => {
        return `https://storage.googleapis.com/helpinhand-318217.appspot.com/${user.image}`
    }

    const props = {
        lat: activity.lat,
        long: activity.lon,
    }

    return (
        <div className={styles.container}>

            <div className={styles.header}>
                <Header />
            </div>

            <div className={styles.organizer}>

                <div className={styles.org_info}>
                    <div className={styles.avatar}>
                        <Link href={`/${activity.activityOwner}`}><a><Image loader={myLoader}
                            src='me.png'
                            placeholder="blur"
                            width={70}
                            height={70}
                            className={styles.image} /></a></Link>
                    </div>
                    <Link href={`/${activity.activityOwner}`}><a>{activity.activityOwner}</a></Link>
                </div>
                <div className={styles.detailmap}>
                    <div className={styles.details}>
                        <p><a className={styles.bold}>{"Data: "}</a>{format(new Date(activity.date), "dd/MM/yyyy")}</p>
                        <p> <a className={styles.bold}>{"Local: "}</a>  {activity.location}</p>
                        <p> <a className={styles.bold}>{"Categoria: "}</a>  {activity.category}</p>
                        <p> <a className={styles.bold}>{"Vagas preenchidas: "}</a>  {activity.participants + "/" + activity.totalParticipants}</p>
                        <div className={styles.description}>
                            <p className={styles.desc}> <a className={styles.bold}>{"Descrição: "}</a>{activity.description}</p>

                        </div>
                    </div>
                    <div className={styles.map}>
                        <MapActivity {...props} />

                        {
                            (!isParticipating === false && activity.participants === activity.totalParticipants) || activity.activityOwner === token.iss ?
                                <></> : <button onClick={handleClick}>
                                    {isParticipating ? "Cancelar" : "Participar"}
                                </button>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

