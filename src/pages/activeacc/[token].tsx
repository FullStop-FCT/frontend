import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import Loading from "../../Components/Loading";
import jwt_decode from "jwt-decode"
import { Token } from "../../types";
import {useRouter} from "next/router";
import EmailConfirmation from "../../Components/EmailConfirmation";

export default function token(){
  
  const router = useRouter();
  let token = window.location.pathname.replace('/', '')
  let path_values: String[] = token.split("/");
  const[active,setActive] = useState<number>(null);
  let jwt = path_values[1];

  useEffect( () => {
    const funct = async () => {
      let decodetoken: Token = jwt_decode(token);
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }
      console.log(token)
       await api.post('users/confirmSignup',decodetoken.iss,config)
                .then(response => setActive(response.status))
                .catch(error => setActive(error.response.status))
  
    }
    funct()
   
  },[])

  if(active === null) 
    return ( <Loading /> );

  else
    return ( <EmailConfirmation response={active}/> );
  }