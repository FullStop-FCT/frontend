import Cookies from "js-cookie";
import useSWR from "swr";
import { api } from "../../../services/api";
import ActivityToDo from '../Activitytodo'
import ActivityCreated from '../ActivityCreated'
import { Token, activitytodoProps,listAtivitiesTodoProps } from "../../types";
import { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component'


export default function OwnActivitiesList() {
  const [listativities, setListativities] = useState<listAtivitiesTodoProps>([]);
  const [cursor, setCursor] = useState<string>(null);
  let username = window.location.pathname.replace('/', '')
  const [endlist, setEndlist] = useState<boolean>(true);
  const token: Token = Cookies.getJSON('token')
  let config = {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  }
  async function fetchData() {
    console.log('segundo fetch')
    console.log(username)
       await api.post(`activities/listCreatedActivities/?username=${username}`, cursor, config).then( (response) => {
        
        if(response.data.results.length === 0 ){
          setEndlist(false);
          return;
        }
        console.log(response.data.results)
        setListativities((current) => 
          current.concat(response.data.results)   
      )
      setCursor(response.data.cursorString)
        console.log(cursor);});
    }
    useEffect(() => {
      fetchData();
    }  
    , [])
  
  return (
    <div>
<h3 style={{ textAlign: 'center' }}>Atividades Criadas</h3>
<InfiniteScroll
          dataLength={listativities.length * 5} //This is important field to render the next data
          next={fetchData}
          hasMore={endlist}
          loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
          //scrollableTarget="target"
          endMessage={
            <div>
            <br/>
              <p style={{ textAlign: 'center' }}>
                <b>Não há mais atividades.</b>
            </p>
          </div>
          }
        >
         {listativities.map((activity: activitytodoProps, index) => {
        return (
          <ActivityCreated {...activity} key={index} />
        )
      })
      }
          
          </InfiniteScroll>





      
    </div>
  )
}