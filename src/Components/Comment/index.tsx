import {comment} from '../../types'

export default function Comment(comment:comment){
  return (
    <div>
      <p>{comment.message}</p>
      
    </div>

  )
}