
import { useState } from 'react';
import styles from './styles.module.scss'
import Link from 'next/link';
import { AuthContext } from '../../Context/AuthContext'
import React, { useContext } from 'react'
import Cookies from 'js-cookie'
import { FaHandHoldingHeart } from 'react-icons/fa'
import { IoCreateSharp, IoNotifications, IoHome, IoTrophySharp, IoPersonSharp } from 'react-icons/io5'
import { BsFillPeopleFill } from "react-icons/bs";
export default function NavBar() {


  const [state, setState] = useState(false)
  const { handleLogout } = useContext(AuthContext);
  const Token = Cookies.get('user')
  const handleClick = () => {
    setState(!state)
  }


  return (
    <div className={styles.Container}>
      <div className={styles.NavbarItems}>

        <Link href={'/'}><h1>Helpin'Hand</h1></Link>
        <div className={styles.Navbar}>

          <Link href={'/'}><div className={styles.topics}><span className={styles.links}><IoHome /><a className={styles.linkname}> Início</a></span></div></Link>

          <Link href={`/${Token}`}>
            <div className={styles.topics}><span className={styles.links} ><IoPersonSharp /><a className={styles.linkname}> Perfil</a></span></div></Link>

          <Link href={'/home'}><div className={styles.topics}><span className={styles.links}><FaHandHoldingHeart /><a className={styles.linkname}> Explorar</a></span></div></Link>

          <Link href={'/organizations'}><div className={styles.topics}><span className={styles.links}><BsFillPeopleFill /><a className={styles.linkname}> Organizações</a></span></div></Link>

          <Link href={'/createActivity'}><div className={styles.topics}><span className={styles.links}><IoCreateSharp /><a className={styles.linkname}> Criar Atividade</a></span></div></Link>

          <Link href={'/rankings'}><div className={styles.topics}><span className={styles.links}><IoTrophySharp /><a className={styles.linkname}> Rankings</a></span></div></Link>

          {/*<Link href={`/home`}><div className={styles.topics}><span className={styles.links}><IoNotifications /><a className={styles.linkname}> Notificações</a></span></div></Link> */}



          <button onClick={() => handleLogout()}>Logout</button>
        </div>


      </div>
    </div >

  )
}