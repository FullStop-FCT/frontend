import Header from '../Components/Header';
import defaultStyles from './styles/base.module.scss';
import rankingStyles from './styles/rankings.module.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

type Token = {
    username: string,
    tokenID: string,
    role: string,
    creationData: number,
    expirationData: number
}

export default function Rankings() {

    const token: Token = Cookies.getJSON('token');

    const [users, setUsers] = useState([]);

    useEffect( () => {
        axios.post('https://helpinhand-318217.ey.r.appspot.com/rest/users/user/hours', token)
            .then(response => { setUsers(response.data)})
    }, [])

    return (
        <div className={defaultStyles.container}>

            <div className={defaultStyles.header}>
                <Header/>
            </div> 

            
            <div className={rankingStyles.option}> <h1>Utilizadores</h1> </div>

            <div className={rankingStyles.option}> Organizações</div>


            {/*<div className={defaultStyles.Feed}>
                <div className={rankingStyles.scoreTable}>
                    <table>
                        <tbody>
                            <tr>
                                <th>Nome</th>
                                <th>Horas Realizadas</th>
                            </tr>
                        </tbody>
                        {users.map( (user, index) => 
                                <tbody key={index}>
                                    <tr >
                                        <td>{user.username}</td>
                                        <td>{user.hoursDone}</td>
                                    </tr>
                                </tbody> 
                                
                            )}

                    </table>
                </div>
                        </div>*/}
        </div>
    )
}