import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode"
import {Token,userProps} from '../types';
import UserOwnProfile from '../Components/UserOwnProfile'
import OtherUserProfile from '../Components/OtherUserProfile'

export default function User() {

  const router = useRouter();
 
  let username = window.location.pathname.replace('/', '')
  
  let token: Token = null
  try{ 
    token = jwt_decode(Cookies.getJSON('token'));
  }
  catch(error){ 
    window.location.href = '/login';
  }

  if (username == token.iss) {
    return (
      <div>
        <UserOwnProfile/>
      </div>
    )
  }

  else {
    return (
      <div>
        <OtherUserProfile/>
      </div>
    )
  }
}