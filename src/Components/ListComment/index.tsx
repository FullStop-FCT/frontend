import Cookies from "js-cookie";
import { useEffect, useState } from "react"
import { api } from "../../../services/api";
import { AtivitiesProps, comment } from "../../types";
import InfiniteScroll from 'react-infinite-scroll-component'
import Comment from "../../Components/Comment";
import styles from './styles.module.scss'

export default function ListComment(activity:AtivitiesProps){
  //console.log('accc',activity.ID)
  const token = Cookies.getJSON('token')
  const [cursor, setCursor] = useState<string>(null);
  const [comments, setListcomments] = useState<comment[]>([]);
  const [endlist, setEndlist] = useState<boolean>(true);
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  }

  useEffect(() => {
    fetch();
  }  
  , [])

  async function fetch(){
    //console.log('fetch')
    await api.post(`comments/list/${activity.ID}/${activity.activityOwner}`,cursor,config).then( response => {
  
      if(response.data.results.length ===0 ){
        setEndlist(false);
        return;
      }
      setCursor(response.data.cursorString);
      setListcomments((current) => current.concat(response.data.results))
      //console.log(cursor)

    })

  }
  

  return(
    
    <div id="scrollableDiv" className={styles.scrollableDiv}>
    {
    
<InfiniteScroll
  dataLength={comments.length * 5} //This is important field to render the next data
  next={fetch}
  hasMore={endlist}
  loader={<h4>Loading...</h4>}
  //scrollableTarget="target"
  
  endMessage={
    <p style={{ textAlign: 'center' }}>
  <b>Sem mais comentários</b>
  </p>
  }
  scrollableTarget="scrollableDiv"
>
  {
  
  !comments ? <></> :

  comments.map((ativ, index) => < Comment {...ativ} key={index} />)
  
  }
  
  </InfiniteScroll>
  }
  </div>


  )

}