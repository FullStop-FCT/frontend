import styles from './styles.module.scss'
import Link from 'next/link';
import { AuthContext } from '../../Context/AuthContext'
import React, { useContext } from 'react'
import Cookies from 'js-cookie'
import { FaHandHoldingHeart } from 'react-icons/fa'
import { IoCreateSharp, IoLogOutSharp, IoHome, IoTrophySharp, IoPersonSharp, IoMail } from 'react-icons/io5'
import { BsFillPeopleFill } from "react-icons/bs";
import  {Token } from '../../types';
import jwt_decode from 'jwt-decode';
import Cookie from 'js-cookie';
import router from 'next/router';

export default function NavBar() {

  const { handleLogout } = useContext(AuthContext);
  const token: Token = jwt_decode(Cookies.getJSON('token'))

  const role = token.role;

  let username = window.location.pathname.replace('/', '')
  return (
    <div className={styles.Container}>
      <div className={styles.NavbarItems}>

        <div className={styles.Navbar}>

        <Link href={'/'}><h1 className={styles.title} >HxP</h1></Link>  

          <Link href={'/'}><div className={styles.topics}><span className={styles.links}><IoHome /><a className={styles.linkname}> Início</a></span></div></Link>

            <Link href={`/${token.iss}`}>
              <div className={username == `${token}` ? `${styles.linkactive}` : `${styles.topics}`}><span className={styles.links} ><IoPersonSharp /><a className={styles.linkname}> Perfil</a></span></div>
            </Link>

          <Link href={'/home'}><div className={styles.topics}><span className={styles.links}><FaHandHoldingHeart /><a className={styles.linkname}> Explorar</a></span></div></Link>

          <Link href={'/organizations'}><div className={styles.topics}><span className={styles.links}><BsFillPeopleFill /><a className={styles.linkname}> Organizações</a></span></div></Link>

          <Link href={'/createActivity'}><div className={styles.topics}><span className={styles.links}><IoCreateSharp /><a className={styles.linkname}> Criar Atividade</a></span></div></Link>

          <Link href={'/rankings'}><div className={styles.topics}><span className={styles.links}><IoTrophySharp /><a className={styles.linkname}> Rankings</a></span></div></Link>

          { (role == 'BO' || role == 'ADMIN') ?

              <div>
                <Link href={'/global-users'}><div className={styles.topics}><span className={styles.links}><a className={styles.linkname}> Utilizadores </a></span></div></Link>

                <Link href={'/create-org'}><div className={styles.topics}><span className={styles.links}><a className={styles.linkname}> Criar Org</a></span></div></Link>
              </div>

            :
            
            null
          }

          {  (role == 'ADMIN') ?

              <div>

                <Link href={'/create-bo'}><div className={styles.topics}><span className={styles.links}><a className={styles.linkname}> Criar Utilizador</a></span></div></Link>

                <Link href={'/bo-users'}><div className={styles.topics}><span className={styles.links}><a className={styles.linkname}> Staff</a></span></div></Link>

              </div>

            :

              null
          }

          <div className={styles.topics}>
            <span className={styles.links}>
              <IoLogOutSharp />
              <a onClick={() => {
                //window.location.href = '/';
                router.push('/');
                //Cookie.remove('token');
                handleLogout();
                              }
                              } 
                  className={styles.linkname}> Logout</a>
            </span>
          </div>
        </div>
      </div>
    </div >

  )
}