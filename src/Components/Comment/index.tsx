import {comment} from '../../types'
import styles from './styles.module.scss'
export default function Comment(comment:comment){
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