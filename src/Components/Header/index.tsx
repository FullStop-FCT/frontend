
import { menu } from './menuitems'
import { useState } from 'react';
import styles from './styles.module.scss'
import Link from 'next/link';
import { AuthContext } from '../../Context/AuthContext'
import React, { useContext } from 'react'
export default function NavBar() {


  const [state, setState] = useState(false)
  const { handleLogout } = useContext(AuthContext);
  const handleClick = () => {
    setState(!state)
  }


  return (
    <div>
      <div className={styles.NavbarItems}>
        <nav >
          <h1>Helpin'Hand</h1>
          <div className={styles.Navbar}>
            <ul>
              {menu.map((item, index) => {
                return (
                  <p key={index}>

                    <Link href={item.url} ><a className={item.cName}

                    >{item.title}</a></Link>

                  </p>

                )
              })}

            </ul>
          <button onClick={() => handleLogout()}>Logout</button>
          </div>

        </nav>
      </div>
    </div>

  )
}