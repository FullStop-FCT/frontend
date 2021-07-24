import Cookies from "js-cookie";
import { useEffect, useState } from "react"
import { api } from "../../../services/api";
import { comment } from "../../types";
import InfiniteScroll from 'react-infinite-scroll-component'


export default function ListComment(activityId){
  const activity = activityId;
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
  async function fetch(){
      
    await api.post(`comments/list/${activity}`,cursor,config).then( response => {

      setCursor(response.data.cursorString);
      setListcomments(response.data.results)

    })

  }
  useEffect( () => {
    fetch();

  },[])

  return(
    <div>
{

    
<InfiniteScroll
  dataLength={comments.length * 5} //This is important field to render the next data
  next={fetch}
  hasMore={endlist}
  loader={<h4>Loading...</h4>}
  //scrollableTarget="target"
  endMessage={
  <p style={{ textAlign: 'center' }}>
  <b>Yay! You have seen it all</b>
  </p>
  }
>
  {
  
  !comments ? <></> :

  comments.map((ativ, index) => <div>{ativ}<div/>
  }
    
  </InfiniteScroll>
  }


    </div>
  )

}