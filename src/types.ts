

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
}

export type listuserProps = userProps[];


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