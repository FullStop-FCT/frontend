import styles from '../../styles/activity.module.scss'
import Header from '../../../Components/Header'
import { Formik, Form, useField, FieldAttributes } from 'formik'
import Cookies from 'js-cookie'
import { api, storageProfilePic } from '../../../../services/api'
import useSWR from 'swr'
import * as Yup from 'yup';
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
import {BiPhotoAlbum} from 'react-icons/bi'
import ListComment from '../../../Components/ListComment'
import {TextField,Button} from '@material-ui/core';
import { useRouter } from 'next/router'
import Head from "next/head";
export default function Activity() {
    const router = useRouter();
    let path = window.location.pathname.replace('/', '');
    let path_values: String[] = path.split("/");
    let activityOwner = path_values[1];
    let activityID = path_values[2];
    const [userjoined, setUserjoined] = useState([]);
    const [isParticipating, setParticipation] = useState(false);
    const [activity, setActivity] = useState<AtivitiesProps>(null);
    const [photoState, setphotoState] = useState(null);
    const [photopreviewState, setphotopreviewState] = useState(null);



    const Multiline: React.FC<FieldAttributes<{}>> = ({ type, placeholder, ...props }) => {
        const [field, meta] = useField<{}>(props);
        const errorText = meta.error && meta.touched ? meta.error : "";
        return (
          <TextField rows={3} variant="outlined" multiline type={type}
            size="small" placeholder={placeholder} {...field} helperText={errorText} error={!!errorText} className={styles.multiline} />
        )
    }
    async function SetHours() {
        await api.get(`activities/compute/${activity.ID}/${activity.activityTime}`,config).then(response => console.log(response.data))
        router.reload();
    }

    const validationSchema = Yup.object({
        comment: Yup.string()
          .max(100, "A descrição deve conter no maximo 100 caráteres.")
          .required("Obrigatório"),
       
      });


      async function ApagarAtividade(){
        const config = {
            headers: {
              'Authorization': 'Bearer ' + token ,
              'Content-Type': 'application/json'
            }
          }

        await api.delete(``, config).then(response => setActivity(response.data))
            
        
        router.push('/home')


      }


    async function fetchActivity(path: string) {
        
        await api.get(path, config).then(response => setActivity(response.data))
        
    }

    async function fetchUser(path: string): Promise<userProps> {
        
        return await api.get(path,config).then(response => response.data);
    }

    async function fetchUserJoined(path: string) {

         await api.get(path, config).then(response =>(setUserjoined(response.data)))
    }

    const token = Cookies.getJSON('token');
    const decodedtoken: Token = jwt_decode(token);
    const config = {
        headers: {
          'Authorization': 'Bearer ' + token ,
          'Content-Type': 'application/json'
        }
      }
    
      const photoHandler = (event) => {
       // console.log(event.target.files[0])
        setphotoState(event.target.files[0])
        setphotopreviewState(URL.createObjectURL(event.target.files[0]))
        //console.log(photopreviewState);
        //console.log(photoState)
      }

    let { data: user, error: error2 } = useSWR(`users/get/${activityOwner}`, fetchUser);

    useEffect(() => {
        async function fetch(){
            await api.get(`activities/isjoined/${activityID}`, config).then(response => setParticipation(response.data))
        }

        fetchActivity(`activities/get/${activityID}/${activityOwner}`)
        fetch();
        //console.log(activity)
        fetchUserJoined(`activities/listJoinedUsers/${activityID}`);
        
    }, [isParticipating])

    async function handleClick() {
        
        let user =  decodedtoken.iss;
       // console.log(decodedtoken.iss)
        if (!isParticipating) {
            await api.post(`activities/join/${activityID}/${activityOwner}`,user,config).catch(error => console.log(error));
            setParticipation(true);
        }
        else {
            await api.post(`activities/leave/${activityID}/${activityOwner}`,user,config);
            setParticipation(false);
        }
    }

    if ( !user || !activity) return <Loading />
    if ( error2 ) { return <SessionOf /> }

    //console.log(userjoined)
    const myLoader = () => {
        return `https://storage.googleapis.com/helpinhand-318217.appspot.com/${user.image}`
    }

    //console.log(activity);
    const props = {
        lat: activity.lat,
        long: activity.lon,
        waypoints: activity.waypoints,
    }
    var now = new Date(Date.now())
    
    var today = activity.date.split("-")
    var hour = activity.startHour.split(":")
    //console.log(activity.date)
    //console.log(parseInt(today[1]))
    var newDate = new Date(parseInt(today[0]),parseInt(today[1])-1,parseInt(today[2]),parseInt(hour[0]),parseInt(hour[1]));
    //console.log(newDate > now );
    //console.log(now)
   // console.log(newDate)
    
    

    return (
        <div className={styles.main}>
             <Head>
        <title>{activity.title}</title>
      </Head>
            <div className={styles.header}>
                <Header />
            </div>
        <div className={styles.container}>
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
                        <p> <a className={styles.bold}>{"Hora de início: "}</a>  {activity.startHour}</p>
                        <p> <a className={styles.bold}>{"Hora de término: "}</a>  {activity.endHour}</p>
                        <p> <a className={styles.bold}>{"Categoria: "}</a>  {activity.category}</p>
                        <p> <a className={styles.bold}>{"Local: "}</a>  {activity.location}</p>
                        <p> <a className={styles.bold}>{"Categoria: "}</a>  {activity.category}</p>
                        <p> <a className={styles.bold}>{"Vagas preenchidas: "}</a>  {activity.participants + "/" + activity.totalParticipants}</p>
                        
                        <div className={styles.description}>
                            <p className={styles.desc}> <a className={styles.bold}>{"Descrição: "}</a>{activity.description}</p>

                        </div>
                        <div >
                            
                        <a className={styles.voluntariados}>             {"Voluntariados: "}</a><br/>
                            {
                               userjoined.map((user,index) =>
                               <div key={index} >
                               <li className={styles.username}>
                               <a href={`/${user}`}>{user}</a><br/>
                               </li>
                                 </div>
                               )
                            }

                        </div>
                        
                    </div>
                    <div className={styles.map}>
                        <MapActivity {...props} />

                        {
                            
                            newDate < now || activity.activityOwner == decodedtoken.iss || activity.participants == activity.totalParticipants  ?
                                <></> : <button onClick={handleClick}>
                                    {isParticipating ? "Cancelar" : "Participar"}
                                </button>
                        }
                        {/*
                            activity.activityOwner == decodedtoken.iss ?
                            <button className={styles.addhours} onClick={ApagarAtividade}>Apagar Atividade</button> : null
                        */}

                        {

newDate < now  && activity.activityOwner === decodedtoken.iss && activity.done === false ? <button className={styles.addhours} onClick={SetHours}>
Atribuir Horas aos participantes {activity.done}
</button> : <></>
                            
                        }

                    </div>
                </div>
               
            </div>
            
            <div className={styles.areacomentarios}>
                     
                           
        <Formik initialValues={{
          comment: '',
    
        }}
          validationSchema={validationSchema}

          //resetform
          onSubmit={async (values, { setSubmitting,resetForm }) => {
            setSubmitting(true)
        
            
            let image: string = ""
            if(photoState !== null){
                const fd = new FormData();
                fd.append('image', photoState);
               image= decodedtoken.iss + Date.now() + activityOwner +'.jpg';
                await storageProfilePic.post(image, fd)
                      .then(function (response) {
                        //console.log(response)
                        console.log('upload')
                      }).catch(function (error) {
    
                        console.log(error);
                      })
            }
    
            let request = JSON.stringify({
                message: values.comment,
                image: image,
            })
    
            const config = {
                headers: { 
                  'Authorization': 'Bearer ' + token,
                  'Content-Type': 'application/json' },
              }
            await api.post(`comments/insert/${activityID}/${activityOwner}`,request,config).then(response => {console.log(response)}).catch(error => console.log(error))
            setphotoState(null);
            
            resetForm();
            setphotopreviewState("");
            setSubmitting(false);
            router.reload();
            

          }
          }>

          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <div className={styles.formtext}>
                <Multiline placeholder="Escreva um comentário" name="comment" type="input"
                  as={Multiline} />

                <button className={styles.enviar} disabled={isSubmitting} type="submit">Enviar</button>

              </div>
            </Form>
          )
          }
        </Formik>

                        <div className={styles.send}>
                            <div className={styles.addphoto}>
            
                                <input accept="image/*" className={styles.input} id="icon-button-file" type="file" onChange={photoHandler}  />
                                <label htmlFor="icon-button-file">
                                upload
                                <BiPhotoAlbum/>
                                </label>
                                <img src={photopreviewState} className={styles.imagepreview} />
                        
                            </div>
                            
                        </div>
                        
                        
            </div>

            <div className={styles.listcomment}>
                        <ListComment {...activity}/>
            </div>
        </div>
        
       
        </div>
    )
}

