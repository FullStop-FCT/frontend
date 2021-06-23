import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../../services/api';
import { useRouter } from 'next/router'
import Cookie from 'js-cookie';
import { addDays, milliseconds } from 'date-fns'


type data = {
  username: string;
  password: string;

}
type marker = {
  lat: number,
  lng: number,
}

type AuthContextData = {
  authenticated: boolean;
  handleLogin: (data: data) => void;
  handleLogout: () => void;
  subAtivity: boolean;
  setSubAtivity: (state: boolean) => void;
  subEdit: boolean;
  setSubEdit: (state: boolean) => void;
  activityLocation: string;
  setActivityLocation: (input: string) => void;
  markers: marker;
  setMarkers: (marker: marker) => void
}

export const AuthContext = createContext({} as AuthContextData);

type AuthContextProviderProps = {
  children: ReactNode;
}
export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const router = useRouter();
  const [activityLocation, setActivityLocation] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [subAtivity, setSubAtivity] = useState(true);
  const [subEdit, setSubEdit] = useState(false);
  const [markers, setMarkers] = useState({ lat: 0, lng: 0 });








  useEffect(() => {

    const token = Cookie.get('token');
    if (token) {
      //api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;

      setAuthenticated(true);

    }
    else {
      setAuthenticated(false);
    }
    setLoading(false);

  }, []);

  async function handleLogout() {
    setAuthenticated(false);
    Cookie.remove('token');
    Cookie.remove('user');
    router.push('/');

  }



  async function handleLogin(data: { username: string, password: string }) {
    //const router = useRouter();

    await api.post('authentication/login', data

    ).then(function (response) {

      if (response.data) {
        console.log(response)
        Cookie.set('token', JSON.stringify(response.data));
        Cookie.set('user', response.data.username)
        //add date-fns
        //api.defaults.headers.Authorization = `Bearer ${response.data.tokenID}`;
        //console.log(response.data.username)
        setAuthenticated(true);


        router.push(`/${response.data.username}`);
      }
    })
      .catch(function (error) {
        console.log(error);
        setAuthenticated(false);
      });



  }

  if (loading) {
    return <h1>Loading</h1>
  }

  return (
    <AuthContext.Provider value={{
      authenticated, handleLogin, handleLogout, subAtivity, setSubAtivity, subEdit, setSubEdit, activityLocation, setActivityLocation,
      markers, setMarkers,
    }}>
      {children}
    </AuthContext.Provider>
  )
}




