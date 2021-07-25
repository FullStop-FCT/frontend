import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../../services/api';
import { useRouter } from 'next/router'
import Cookie from 'js-cookie';
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
  error: string;
  setError: (string) => void;
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
  const [error, setError] = useState("");


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
  }


  async function handleLogin(data: { username: string, password: string }) {

    await api.post('/authentication/login', data

    ).then(function (response) {

      if (response.data) {
        Cookie.set('token', JSON.stringify(response.data),{ expires: 1 });
       

        setAuthenticated(true);
        var decoded: token = jwt_decode(response.data);
        
      }
    })
      .catch(function (error) {
        setError(error.response.data);
        setAuthenticated(false);
      });

      router.push('/home');
  }

  if (loading) {
    return <> </>
  }

  return (
    <AuthContext.Provider value={{
      authenticated, handleLogin, handleLogout, subAtivity, setSubAtivity, subEdit, setSubEdit, keywords, setKeywords, error, setError
    }}>
      {children}
    </AuthContext.Provider>
  )
}




