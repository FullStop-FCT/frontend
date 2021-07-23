import Cookies from "js-cookie";
import useSWR from "swr";
import { api } from "../../../services/api";
import { activitytodoProps, listAtivitiesTodoProps, Token } from "../../types";
import ActivityToDo from '../Activitytodo'



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

  const { data, error } = useSWR('activities/listJoinedActivities', fetcher);
  if (!data) return <div>loading</div>
  if (error) { return <div>error</div> }

  let activities: listAtivitiesTodoProps = data;
  console.log(activities)
  return (
    <div>
      {activities.map((activity: activitytodoProps, index) => {
        if (activity.activityOwner !== token.iss) {
          return (
            < ActivityToDo {...activity} key={index} />
          )
        }

      })
      }
    </div>
  )
}