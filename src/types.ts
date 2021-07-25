

export type Token = {
  exp: number,
  iat: number,
  image: string,
  iss: string,
  role: string
}

export type userProps = {
  birthday: string;
  email: string;
  name: string;
  profile: string;
  phoneNumber: string;
  mobileNumber: string;
  address: string;
  location: string;
  postalCode: string;
  gender: string;
  username: string;
  points: number;
  kind: string;
  image: string;
  followers: number,
  followings: number,
  reports: number,
  isOrg: boolean
}

export type listuserProps = userProps[];

export type BackOfficeProps = {
  username: string;
  email: string;
  password: string;
  role: string;
}

export type listBackOfficeProps = BackOfficeProps[];


export type AtivitiesProps = {
  ID: string,
  title: string,
  description: string,
  date: string,
  location: string,
  participants: number
  totalParticipants: number,
  activityOwner: string,
  category: string
  lat: string,
  lon: string,
  startHour: string,
  endHour: string,
  keywords: string[],
  waypoints: string[],
  activityTime: number,
  done: boolean,
}

export type listAtivitiesProps = AtivitiesProps[];

export type listAtivitiesCursorProps = {
  results : listAtivitiesProps,
  cursorString : string,
}


export type activitytodoProps = {
  title: number,
  totalParticipants: string,
  activityOwner: string,
  ID: string,
}

export type listAtivitiesTodoProps = activitytodoProps[];

export type mapProps = {
  lat: string,
  long: string
  waypoints: string[],
}


export type pointProps = {
  location: { 
    lat: number,
    lng: number,
  }
}
export type listPointProps = pointProps[];

export type comment = {
  author: string,
  message: string,
  receiver: string,
  date: string,
  activityID: string,
  image: string,
  msgID: number

}

export type listComments = {

  results : comment[],
  cursorString: string,

}
