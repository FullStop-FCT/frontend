import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import Loading from "../../Components/Loading";
import jwt_decode from "jwt-decode"
import { Token } from "../../types";
import {useRouter} from "next/router";
import EmailConfirmation from "../../Components/EmailConfirmation";

export default function token(){
  
  const[active,setActive] = useState<number>(null);
  const router = useRouter();
  let path = window.location.pathname.replace('/', '')
  let path_values: string[] = path.split("/");
  let jwt = path_values[1];
  console.log(jwt)
  useEffect( () => {
    const funct = async () => {
      let decodetoken: Token = jwt_decode(jwt);
      console.log(decodetoken)
      let config = {
        headers: {
          'Authorization': 'Bearer ' + jwt,
          'Content-Type': 'application/json'
        }
      }
      console.log(token)
       await api.post('users/confirmSignup',decodetoken.iss,config)
                .then(response => setActive(response.status))
                .catch(error => setActive(error.response))
  
    }
    funct()
   
  },[])

  if(active === null) 
    return ( <Loading /> );

  else
    return ( <EmailConfirmation response={active}/> );
  }