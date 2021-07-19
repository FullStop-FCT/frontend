import Cookies from "js-cookie";
import useSWR from "swr";
import { api } from "../../../services/api";
import Link from 'next/link'
import Image from 'next/image'
import styles from './styles.module.scss'
import { format } from "date-fns";
import { activitytodoProps, AtivitiesProps, Token, userProps } from "../../types";
import jwt_decode from 'jwt-decode'





const token = Cookies.getJSON('token');
let decodedToken: Token = null;

async function fetchActivity(path: string): Promise<AtivitiesProps> {
  const token = Cookies.getJSON('token');
    let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
  return await api.get(path, config).then(response => response.data)
}

async function fetchUser(path: string): Promise<userProps> {

  let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
  return await api.get(path,config).then(response => response.data)
}
export default function ActivityCreated(activity: activitytodoProps) {

  decodedToken= jwt_decode(Cookies.getJSON('token'));
  let { data: act, error: error1 } = useSWR(`activities/get/${activity.ID}/${decodedToken.iss}`, fetchActivity);
  let { data: user, error: error2 } = useSWR(`users/get/${decodedToken.iss}`, fetchUser);
  if (!act || !user) return <div>loading</div>
  if (error1 || error2) { return <div>error</div> }

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
        <h3>{activity.title}</h3>

        <div className={styles.activityinfo}>

        </div>
      </div>
      <div className={styles.vermaiscontainer}>
        <Link href={`activity/${token.iss}/${activity.ID}`}><p>Ver mais</p></Link>
        <div className={styles.vermais}>
        </div>
      </div>
    </div>

  )
}