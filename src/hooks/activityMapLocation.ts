import { useContextSelector } from "use-context-selector"
import { AuthContext } from "../Context/AuthContext"
export function activityMapLocation() {
  const location = useContextSelector(AuthContext, location => { location.activityLocation });
  //const setLocation = useContextSelector(AuthContext, location => { location.setActivityLocation });

  return {
    location,
    //setLocation,
  }
}