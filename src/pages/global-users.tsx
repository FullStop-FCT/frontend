import  {Token } from '../types';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import UnauthorizedAcess from '../Components/UnauthorizedAccess';
import styles from './ranking/rankingtables.module.scss';
import Header from '../Components/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Users() {

    const token: Token = jwt_decode(Cookies.getJSON('token'))

    let role = token.role;

    if (role == 'USER')
        return (<div><UnauthorizedAcess/></div>)

    else {
        const [users, setUsers] = useState([]);

        useEffect( () => {
            axios.post('https://helpinhand-318217.ey.r.appspot.com/rest/users/user/hours', token) //Mudar fetch aqui
                .then(response => { setUsers(response.data)})
        }, [])

        return (
            <div className={styles.container}>

                <div className={styles.header}>
                    <Header/>
                </div> 

                <div className={styles.scoreTable}>
                    <table>
                        <tbody>
                            <tr>
                                <th>Username</th>
                                <th>Role</th>
                            </tr>
                        </tbody>
                        {users.map( (user, index) => 
                                <tbody key={index}>
                                    <tr>
                                        <td>{user.username}</td> 
                                        <td>meter role aqui</td>
                                    </tr>
                                </tbody>
                            )
                        }
                    </table>
                </div>
            </div>
        )
    }
}