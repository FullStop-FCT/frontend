import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../../services/api';
import { useRouter } from 'next/router'
import Cookie from 'js-cookie';
import { addDays, milliseconds } from 'date-fns'
import Loading from '../Components/Loading'
import { IoLogOutSharp } from 'react-icons/io5';
import KeyWord from '../Components/keywords';

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
  keywords: string[];
  setKeywords: (string) => void;
}

export const AuthContext = createContext({} as AuthContextData);

type AuthContextProviderProps = {
  children: ReactNode;
}
export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const router = useRouter();

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [subAtivity, setSubAtivity] = useState(false);
  const [subEdit, setSubEdit] = useState(false);
  const [keywords, setKeywords] = useState([]);


  useEffect(() => {

    const token = Cookie.get('token');
    if (token) {
      setAuthenticated(true);

    }
    else {
      setAuthenticated(false);
      router.push("/login")
    }
    setLoading(false);

  }, []);


  const logOut = () => {

  }
  async function handleLogout() {
    setAuthenticated(false);

    Cookie.remove('token');
    Cookie.remove('user');
    window.location.href = '/';

  }


  async function handleLogin(data: { username: string, password: string }) {

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
    return <Loading />
  }

  return (
    <AuthContext.Provider value={{
      authenticated, handleLogin, handleLogout, subAtivity, setSubAtivity, subEdit, setSubEdit, keywords, setKeywords
    }}>
      {children}
    </AuthContext.Provider>
  )
}




