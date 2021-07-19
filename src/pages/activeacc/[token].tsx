import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import Loading from "../../Components/Loading";
import jwt_decode from "jwt-decode"
import { Token } from "../../types";
import useSWR from "swr";
import {useRouter} from "next/router";



async function fetcher(path: string, token: string) {
  
 

}


export default function token(){
  const router = useRouter();
  let token = window.location.pathname.replace('/', '')
  let path_values: String[] = token.split("/");
 
  let jwt = path_values[1];

  //let {data, error} = useSWR(['users/confirmSignup', jwt], fetcher);

  useEffect(  async () => {
    let decodetoken: Token = jwt_decode(token);
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }
    console.log(token)
     await api.post('users/confirmSignup',decodetoken.iss,config).then(response => response.status)


  },[])
  

console.log(error)
if (!data) return <Loading />    
if (error || data === 403) return <div>Nao foi possivel ativar a conta</div>
  }