import Cookies from "js-cookie";
import useSWR from "swr";
import { api } from "../../../services/api";
import { activitytodoProps, AtivitiesProps, listAtivitiesProps, listAtivitiesTodoProps, Token } from "../../types";
import ActivityToDo from '../Activitytodo'
import Activity from '../Activity'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useEffect, useState } from "react";

async function fetcher(path: string) {
  let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
  return await api.get(path,config).then(response => response.data);
}
const token: Token = Cookies.getJSON('token')
export default function ActivitiesToDoList() {
  const [cursor, setCursor] = useState<string>(null);
  const [firsttimefetch, setfirsttimefetch] = useState(true);
  const [endlist, setEndlist] = useState<boolean>(false);
  const [listativities, setListativities] = useState<listAtivitiesTodoProps>([]);
  let username = window.location.pathname.replace('/', '')
  const config = {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  }
  async function fetchData() {
    //console.log('segundo fetch')
   
       await api.post(`activities/listJoinedActivities/?username=${username}`, cursor, config).then( (response) => {
         setCursor(response.data.cursorString)
         
         if(response.data.results.length === 0 ){
           setEndlist(false);
           return;
          }
       // console.log(response.data.results)
        setListativities((current) => 
          
          current.concat(response.data.results)   
      )
        //console.log(cursor);
      });
    
    }

    useEffect(() => {
      fetchData()
      setEndlist(true)
       
      
    },[])

    
  
  return (
    <div>
       <h3 style={{ textAlign: 'center' }}>Atividades a fazer</h3>

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
        if (activity.activityOwner !== token.iss) {
          return (
            < ActivityToDo {...activity} key={index} />
          )
        }

      })
      }
          
          </InfiniteScroll>









      
    </div>
  )
}