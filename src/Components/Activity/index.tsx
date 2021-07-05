import styles from './styles.module.scss'
import { api } from '../../../services/api';
import Image from 'next/image'
import useSWR from 'swr';

type AtivitiesProps = {
  title: string,
  description: string,
  date: string,
  location: string,
  totalParticipants: string,
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

    { return `https://storage.googleapis.com/imagenshh/${user.image}` }

  }
  return (
    <div className={styles.container}>
      <div className={styles.avatarandname}>
        <div className={styles.userimage}>
          <Image
            loader={myLoader}
            src='me.png'
            placeholder="blur"
            width={100}
            height={80}
            className={styles.image}
          />
        </div>
        <div className={styles.username}>
          <p>{user.name}</p>
          <p>@{user.username}</p>
        </div>
      </div>
      <div className={styles.activity}>
        <h3>{activity.title}</h3>
        <div className={styles.activityinfo}>
          <div className={styles.localdate}>
            <p>{activity.date}</p>
            <p>{activity.location}</p>
          </div>
          <div className={styles.participants}>
            <h4>Participantes</h4>
            <p>{activity.totalParticipants}</p>
          </div>
        </div>
      </div>
      <div className={styles.vermaiscontainer}>
        <p>Ver mais</p>
        <div className={styles.vermais}>
        </div>
      </div>
    </div>





  )






}