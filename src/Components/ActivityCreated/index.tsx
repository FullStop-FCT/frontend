import Cookies from "js-cookie";
import useSWR from "swr";
import { api } from "../../../services/api";
import Link from 'next/link'
import Image from 'next/image'
import styles from './styles.module.scss'
import { format } from "date-fns";

type activitytodoProps = {
  title: number,
  totalParticipants: string,
  activityOwner: string,
  ID: string,
}

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


const token: Token = Cookies.getJSON('token');
async function fetchActivity(path: string): Promise<ActivitiesProps> {
  return await api.post(path, token).then(response => response.data)
}

async function fetchUser(path: string): Promise<UserProps> {
  return await api.get(path).then(response => response.data)
}
export default function ActivityCreated(activity: activitytodoProps) {


  let { data: act, error: error1 } = useSWR(`activities/get/${activity.ID}/${token.username}`, fetchActivity);
  let { data: user, error: error2 } = useSWR(`users/self/${token.username}`, fetchUser);
  if (!activity || !user) return <div>loading</div>
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
        <Link href={`activity/${token.username}/${activity.ID}`}><p>Ver mais</p></Link>
        <div className={styles.vermais}>
        </div>
      </div>
    </div>

  )
}