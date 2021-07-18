import styles from './styles/users.module.scss'
import Head from "next/head"
import { useState } from 'react'
import { atividades } from '../Components/atividades';
import { AuthContext } from '../Context/AuthContext';
import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Header from '../Components/Header'
import { api } from '../../services/api';
import useSWR from 'swr'
import SessionOf from '../Components/SessionOf'
import Image from 'next/image'
import Loading from '../Components/Loading'
import ActivitiesToDoList from '../Components/ActivitiesToDoList';
import OwnActivitiesList from '../Components/OwnActivitiesList';
import { GoLocation } from 'react-icons/go'
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import Link from 'next/link';
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
  
  
  var myLoader = null;
  let user: userProps = null;

  if (username == token.iss && token.role == 'USER') {
    return (
      <div>
        <UserOwnProfile/>
      </div>
    )
  }

  else if (username == token.iss && token.role !== 'USER') {
    router.push('/home');
  }


  else if (username !== token.iss) {
    return (
      <div>
        <OtherUserProfile/>
      </div>
    )
  }
}