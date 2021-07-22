import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../../services/api';
import { useRouter } from 'next/router'
import Cookie from 'js-cookie';
import { addDays, milliseconds } from 'date-fns'
import Loading from '../Components/Loading'
import { IoLogOutSharp } from 'react-icons/io5';
import KeyWord from '../Components/keywords';
import jwt_decode from "jwt-decode"
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

type token = {
  exp: number,
  iat: number,
  image: string,
  iss: string,
  role: string
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
    if (!token) {
      setAuthenticated(false);
 
    }
    else {
      setAuthenticated(true);

    }
    setLoading(false);

  }, []);


  
  async function handleLogout() {
    setAuthenticated(false);

    Cookie.remove('token');
    //Cookie.remove('user');
    window.location.href = '/';

  }


  async function handleLogin(data: { username: string, password: string }) {

    await api.post('/authentication/login', data

    ).then(function (response) {

      if (response.data) {
        console.log('response',response)
        Cookie.set('token', JSON.stringify(response.data),{ expires: 1 });
       
        //add date-fns
        //api.defaults.headers.Authorization = `Bearer ${response.data.tokenID}`;
        //console.log(response.data.username)
        setAuthenticated(true);
        var decoded: token = jwt_decode(response.data);
        //console.log(decoded.iss)
        router.push(`/${decoded.iss}`);
      }
    })
      .catch(function (error) {
        console.log(error);
        setAuthenticated(false);
      });
  }

  if (loading) {
    return <> </>
  }

  return (
    <AuthContext.Provider value={{
      authenticated, handleLogin, handleLogout, subAtivity, setSubAtivity, subEdit, setSubEdit, keywords, setKeywords
    }}>
      {children}
    </AuthContext.Provider>
  )
}




