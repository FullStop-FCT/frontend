import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { api } from '../../../services/api'
import {comment, Token} from '../../types'
import styles from './styles.module.scss'
import Image from 'next/image'
import jwt_decode from 'jwt-decode'
import router, { useRouter } from 'next/router'
export default function Comment(comment:comment){
  const [imgname, setImgname] = useState(null);
  const token= Cookies.getJSON('token')
      const decodedtoken: Token = jwt_decode(token)
  useEffect( () => {
    async function getimage(){
      
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
       await api.get(`users/get/${comment.author}`,config).then(response => setImgname(response.data.image));
    }
    getimage();
  },[])

  const imageloader = () => {
    return `https://storage.googleapis.com/helpinhand-318217.appspot.com/${imgname}`
  }
  const imageloader2 = () => {
    return `https://storage.googleapis.com/helpinhand-318217.appspot.com/${comment.image}`
  }
  const router = useRouter();
  const deleteComment = async () => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    await api.delete(`comments/delete/${comment.activityID}/${comment.receiver}/${comment.msgID}`,config).then(response => setImgname(response.data.image));

    router.reload();
  
  }

  return (
    <div className={styles.comentario}>

      <div className={styles.author}>
      <Image
                        loader={imageloader}
                        src="me.png"
                        placeholder="blur"
                        width={60}
                        height={60}
                        className={styles.image}
                        />

      <p>{comment.author}</p>
      </div>

      <div className={styles.coment}>
      <p>{comment.message}</p>
      {
        comment.image &&
        
      <Image
                        loader={imageloader2}
                        src="me.png"
                        placeholder="blur"
                        width={400}
                        height={180}
                        className={styles.imagemcoment}
                        />

      }
      </div>
      {
        comment.author === decodedtoken.iss &&
        <button onClick={deleteComment}>apagar</button>
      }
      
  
    </div>

  )
}