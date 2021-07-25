import Header from '../../Components/Header';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styles from './rankingtables.module.scss';

type Token = {
    username: string,
    tokenID: string,
    role: string,
    creationData: number,
    expirationData: number
}

export default function Users() {

    const token: Token = Cookies.getJSON('token');

    const [users, setUsers] = useState([]);

    const config = {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
    }

    useEffect( () => {
        axios.get('https://helpinhand-318217.ey.r.appspot.com/rest/users/user/hours', config)
            .then(response => { setUsers(response.data)})
    }, [])

    function timeConvert(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return rhours + "h " + rminutes + "m";
    }

    return  (

        <div className={styles.container}>

            <div className={styles.header}>
                <Header/>
            </div> 

            <div className={styles.scoreTable}>
                <table>
                    <tbody>
                        <tr>
                            <th>Posição</th>
                            <th>Nome</th>
                            <th>Tempo Dispendido</th>
                        </tr>
                    </tbody>
                    {users.map( (user, index) => 
                            <tbody key={index}>
                                <tr>
                                    <td>{index + 1 + "."}</td>
                                    <td>{user.username}</td> 
                                    <td>{timeConvert(user.hoursDone)}</td>
                                </tr>
                            </tbody>
                        )
                    }
                </table>
            </div>
        </div>
    )
}