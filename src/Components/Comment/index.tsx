import {comment} from '../../types'
import styles from './styles.module.scss'
export default function Comment(comment:comment){
  return (
    <div className={styles.comentario}>
      <p>{comment.message}</p>
      
    </div>

  )
}