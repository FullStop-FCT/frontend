

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
}
export type listAtivitiesProps = AtivitiesProps[];