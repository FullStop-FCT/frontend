import { menu } from './menuitems'
import { useState } from 'react';
import styles from './styles.module.scss'
import Link from 'next/link';
import { AuthContext } from '../../Context/AuthContext'
import React, { useContext } from 'react'
import Cookies from 'js-cookie'
import { CgProfile } from 'react-icons/cg'
import { FaHandHoldingHeart } from 'react-icons/fa'
import { IoCreateSharp, IoNotifications } from 'react-icons/io5'
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

        <h1>Helpin'Hand</h1>
        <div className={styles.Navbar}>

          <div className={styles.topics}>
            <Link href={`/${Token}`}><a className={styles.links} ><CgProfile /><a className={styles.linkname}> Perfil</a></a></Link>
          </div>

          <div className={styles.topics}>
            <Link href={'/home'}><a className={styles.links}><FaHandHoldingHeart /><a className={styles.linkname}> Explorar</a></a></Link>
          </div>

          <div className={styles.topics}>
            <Link href={'/createActivity'}><a className={styles.links}><IoCreateSharp /><a className={styles.linkname}> Criar Atividade</a></a></Link>
          </div>

          <div className={styles.topics}>
            <Link href={`/${Token}`}><a className={styles.links}><IoNotifications /><a className={styles.linkname}> Notificações</a></a></Link>
          </div>


          <button onClick={() => handleLogout()}>Logout</button>
        </div>


      </div>
    </div >

  )
}