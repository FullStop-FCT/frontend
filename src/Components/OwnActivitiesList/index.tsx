import Cookies from "js-cookie";
import useSWR from "swr";
import { api } from "../../../services/api";
import ActivityToDo from '../Activitytodo'
import ActivityCreated from '../ActivityCreated'
import { Token, activitytodoProps,listAtivitiesTodoProps } from "../../types";







async function fetcher(path: string) {
  const token: Token = Cookies.getJSON('token')
  let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
  
  return await api.get(path, config).then(response => response.data);
}

export default function OwnActivitiesList() {

  const { data, error } = useSWR('activities/listCreatedActivities', fetcher);
  if (!data) return <div>loading</div>
  if (error) { return <div>error</div> }

  let activities: listAtivitiesTodoProps = data;
  console.log(activities)
  return (
    <div>
      {activities.map((activity: activitytodoProps, index) => {
        return (
          <ActivityCreated {...activity} key={index} />
        )
      })
      }
    </div>
  )
}