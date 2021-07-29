import Cookies from "js-cookie";
import useSWR from "swr";
import { api } from "../../../services/api";
import Link from 'next/link'
import Image from 'next/image'
import styles from './styles.module.scss'
import { activitytodoProps, AtivitiesProps, Token, userProps } from "../../types";
import { format } from "date-fns";


const token: Token = Cookies.getJSON('token');
const config = {
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  }
}
async function fetchActivity(path: string): Promise<AtivitiesProps> {
  return await api.get(path, config).then(response => response.data)
}

async function fetchUser(path: string): Promise<userProps> {
  return await api.get(path,config).then(response => response.data)
}
export default function ActivityToDo(activity: activitytodoProps) {


  let { data: act, error: error1 } = useSWR(`activities/get/${activity.ID}/${activity.activityOwner}`, fetchActivity);
  let { data: user, error: error2 } = useSWR(`users/get/${activity.activityOwner}`, fetchUser);


  if (!act || !user) return <div></div>
  if (!user) return <div></div>
  if (error1 && error2) { return <div>error</div> }
  if (error1 && error2) { return <div>error</div> }

  const myLoader = () => {

    { return `https://storage.googleapis.com/helpinhand-318217.appspot.com/${user.image}` }

  }
  return (
    <div className={styles.container}>
      <div className={styles.avatarandname}>
        <Link href={`${user.username}`}><div className={styles.userimage}>
          <Image
            loader={myLoader}
            src='me.png'
            placeholder="blur"
            width={70}
            height={70}
            className={styles.image}
          /></div></Link>
        <div className={styles.username}>
          <Link href={`${user.username}`}><p className={styles.name}>{user.name}</p></Link>
          <Link href={`${user.username}`}><p className={styles.arroba}>  @{user.username}</p></Link>
        </div>
      </div>
      <div className={styles.activity}>
        <div className={styles.titlediv}>
        <h3>{activity.title}</h3>
        </div>

        <div className={styles.activityinfo}>
          <div className={styles.localdate}>
            <p>{format(new Date(act.date), "dd/MM/yyyy")}</p>
            <p>{act.location}</p>
          </div>
          <div className={styles.participants}>
            <h4>Participantes</h4>
            <p>{act.participants}/{activity.totalParticipants}</p>
          </div>
        </div>
      </div>
      <div className={styles.vermaiscontainer}>
        <Link href={`activity/${activity.activityOwner}/${activity.ID}`}><p>Ver mais</p></Link>
        <div className={styles.vermais}>
        </div>
      </div>
    </div>

  )
}