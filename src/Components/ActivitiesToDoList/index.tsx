import Cookies from "js-cookie";
import useSWR from "swr";
import { api } from "../../../services/api";
import ActivityToDo from '../Activitytodo'




type listAtivitiesProps = activitytodoProps[];

type Token = {
  username: string,
  tokenID: string,
  role: string,
  creationData: number,
  expirationData: number
}

type activitytodoProps = {
  title: number,
  totalParticipants: string,
  activityOwner: string,
  ID: string,
}
async function fetcher(path: string) {

  return await api.post(path, token).then(response => response.data);
}
const token: Token = Cookies.getJSON('token')
export default function ActivitiesToDoList() {

  const { data, error } = useSWR('activities/listJoinedActivities', fetcher);
  if (!data) return <div>loading</div>
  if (error) { return <div>error</div> }

  let activities: listAtivitiesProps = data;
  console.log(activities)
  return (
    <div>
      {activities.map((activity: activitytodoProps, index) => {
        if (activity.activityOwner !== token.username) {
          return (
            < ActivityToDo {...activity} key={index} />
          )
        }

      })
      }
    </div>
  )
}