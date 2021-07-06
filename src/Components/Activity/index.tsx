import styles from './styles.module.scss'
import { api } from '../../../services/api';
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr';
import { format } from 'date-fns'

type AtivitiesProps = {
  ID: string,
  title: string,
  description: string,
  date: string,
  location: string,
  participants: number
  totalParticipants: number,
  activityOwner: string,
  category: string
}

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

async function fetcher(path: string): Promise<userProps> {
  return await api.get(path).then(response => response.data);
}

export default function Activity(activity: AtivitiesProps) {

  const { data, error } = useSWR(`users/self/${activity.activityOwner}`, fetcher);
  const user: userProps = data;


  if (error) { return (<div>error</div>) }
  if (!data) return <div>Loading</div>

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
          <div className={styles.localdate}>
            <p>{format(new Date(activity.date), "dd/MM/yyyy")}</p>
            <p>{activity.location}</p>
          </div>
          <div className={styles.participants}>
            <h4>Participantes</h4>
            <p>{activity.participants}/{activity.totalParticipants}</p>
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