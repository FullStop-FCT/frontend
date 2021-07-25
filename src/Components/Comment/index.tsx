import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { api } from '../../../services/api'
import {comment, Token} from '../../types'
import styles from './styles.module.scss'
export default function Comment(comment:comment){

  useEffect( () => {

    async function getimage(){
      const token: Token = Cookies.getJSON('token')
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
      return await api.get(`users/get/${comment.author}`,config).then(response => response.data);
    }
  })

  return (
    <div className={styles.comentario}>

      <p>{comment.author}</p>
      <p>{comment.message}</p>
      {
        !comment.image &&
      <img src={`https://storage.googleapis.com/helpinhand-318217.appspot.com/${comment.image}`}></img>
      }
  
    </div>

  )
}