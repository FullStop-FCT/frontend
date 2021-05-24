import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import {api}  from '../../services/api';
import { useRouter } from 'next/router'
import Cookie from 'js-cookie';
import { addDays } from 'date-fns'


type data = {
  username: string;
     password: string;
    
}

type AuthContextData = {
  authenticated: boolean;
  handleLogin:(data:data) => void;
  handleLogout:() => void;
  subAtivity: boolean;
  setSubAtivity: (state:boolean) => void;
  subEdit: boolean;
  setSubEdit: (state:boolean) => void;
}

export const AuthContext = createContext( {} as AuthContextData);

type AuthContextProviderProps = {
  children: ReactNode;
}
export function AuthContextProvider({children}: AuthContextProviderProps){
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const[loading, setLoading] = useState(true);
  const[subAtivity,setSubAtivity] = useState(false);
  const[subEdit,setSubEdit] = useState(false);

  useEffect(()=> {
    
      const token = Cookie.get('token');
      if(token){
        //api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        
        setAuthenticated(true);
        
      }
      else{
        setAuthenticated(false);
      }
      setLoading(false);
    
  },[]);

  async function handleLogout(){
    setAuthenticated(false);
    Cookie.remove('token');
    Cookie.remove('user');
    router.push('/');
    
  }
 


  async function handleLogin(data : {username: string, password: string}){
    //const router = useRouter();
    
    await api.post('authentication/login',data
    
    ).then( function (response) {
      
      if(response.data){
        console.log(response)
        Cookie.set( 'token', JSON.stringify(response.data));
        Cookie.set('user', response.data.username)
        //add date-fns
        //api.defaults.headers.Authorization = `Bearer ${response.data.tokenID}`;
        //console.log(response.data.username)
        setAuthenticated(true);
     
        
        router.push(`/users/${response.data.username}`);   
                }
              })
              .catch(function (error) {
                console.log(error);
                setAuthenticated(false);
              });

            
              
  }

  if(loading){
    return <h1>Loading</h1>
  }

  return (
    <AuthContext.Provider value={{
      authenticated,handleLogin,handleLogout,subAtivity,setSubAtivity,subEdit,setSubEdit}}>
      {children}
    </AuthContext.Provider>
  )
}




