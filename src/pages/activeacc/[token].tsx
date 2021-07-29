import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import Loading from "../../Components/Loading";
import jwt_decode from "jwt-decode"
import { Token } from "../../types";
import {useRouter} from "next/router";
import EmailConfirmation from "../../Components/EmailConfirmation";

export default function token(){
  
  const[status, setStatus] = useState<number>(null);
  const[resMessage, setMessage] = useState<string>("");

  let path = window.location.pathname.replace('/', '')
  let path_values: string[] = path.split("/");
  let jwt = path_values[1];
  //console.log(jwt)

  useEffect( () => {
    const funct = async () => {
      let decodetoken: Token = jwt_decode(jwt);
      //console.log(decodetoken)
      let config = {
        headers: {
          'Authorization': 'Bearer ' + jwt,
          'Content-Type': 'application/json'
        }
      }
      //console.log(token)
       await api.post('users/confirmSignup',decodetoken.iss,config)
                .then( function (response) {
                  setStatus(response.status);
                  setMessage(response.data);
                  //console.log("200000")
                  //console.log(response.status);
                })
                .catch( function (error) {
                  setMessage(error.response.data);
                  setStatus(error.response.status);
                  //console.log(error.response.status);
                })
  
    }
    funct()
   
  },[])

  let props = {
    res : status,
    message : resMessage
    }

  return ( <EmailConfirmation {...props}/> );
  }