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

type Token = {
    username: string,
    tokenID: string,
    role: string,
    creationData: number,
    expirationData: number
}

type ActivitiesProps = {
    ID: string,
    title: string,
    description: string,
    date: string,
    location: string,
    participants: number
    totalParticipants: number,
    activityOwner: string,
    category: string
    lat: string,
    lon: string,
}

type UserProps = {
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

export default function Activity() {

    let path = window.location.pathname.replace('/', '');
    let path_values: String[] = path.split("/");
    let activityOwner = path_values[1];
    let activityID = path_values[2];

    async function fetchActivity(path: string): Promise<ActivitiesProps> {
        return await api.post(path, token).then(response => response.data)
    }

    async function fetchUser(path: string): Promise<UserProps> {
        return await api.get(path).then(response => response.data)
    }

    const token: Token = Cookies.getJSON('token');

    let { data: activity, error: error1 } = useSWR(`activities/get/${activityID}/${activityOwner}`, fetchActivity);
    let { data: user, error: error2 } = useSWR(`users/self/${activityOwner}`, fetchUser);


    function handleClick() {
        api.post(`activities/join/${activityID}/${activityOwner}`, token)
            .then(response => console.log(response.data));
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
                        <p className={styles.desc}> <a className={styles.bold}>{"Descrição: "}</a>{activity.description}</p>
                    </div>
                    <div className={styles.map}>
                        <MapActivity {...props} />
                    </div>

                </div>

                <button onClick={handleClick}>Participar</button>


            </div>
        </div>
    )
}