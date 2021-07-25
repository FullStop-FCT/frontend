import  {Token } from '../types';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import UnauthorizedAcess from '../Components/UnauthorizedAccess';
import styles from './ranking/rankingtables.module.scss';
import Header from '../Components/Header';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import { listBackOfficeProps } from '../types';
import { api } from '../../services/api'



export default function Users() {

    const token = Cookies.getJSON('token');
    const decoded_token: Token = jwt_decode(token);

    let user_role = decoded_token.role;

    
    if (user_role == 'USER' || user_role == 'BO')
        return (<div><UnauthorizedAcess/></div>)

    const [cursor, setCursor] = useState<string>(null);
    const [users, setUsers] = useState<listBackOfficeProps>([]);
    const [endlist, setEndlist] = useState<boolean>(true);

    const config = {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
    }

    async function fetch() {


        return await api.post('backoffice/liststaff', cursor, config) 
            .then(function(response) { 
                
                if(response.data.results.length == 0 ) {
                    setEndlist(false);
                    return;
                    }

                setUsers((current) => 
                    current.concat(response.data.results)  );
                setCursor(response.data.cursorString);})

            .catch(error => console.log(error))
    }

    return (

        <div className={styles.container}>

            <div className={styles.header}>
                <Header/>
            </div> 

            <div className={styles.scoreTable}>
                <InfiniteScroll
                    dataLength={users.length + 6} //This is important field to render the next data
                    next={fetch}
                    hasMore={endlist}
                    loader={<a></a>}
                    endMessage={
                        <div>
                        <br/>
                        <p style={{ textAlign: 'center' }}>
                            <b>Não há mais utilizadores.</b>
                        </p>
                    </div>
                    }
                >
                    <table>
                        <tbody>
                            <tr>
                                <th>Username</th>
                                <th>Cargo</th>
                                <th>Comandos</th>
                            </tr>
                        </tbody>
                        
                            {users.map((user, index) => 
                                    <tbody key={index}>
                                        <tr>
                                            <td>{user.username}</td> 
                                            <td>{user.role}</td>
                                            <td>
                                                {user.role == 'BO' ?
                                                
                                                <button onClick={async() => {await api.post('backoffice/promote', user.username, config);
                                                                            setTimeout(() => location.reload(), 750)}}>
                                                    Promover</button>
                                                
                                                :
                                                
                                                <button onClick={async() => {await api.post('backoffice/demote', user.username, config);
                                                                            setTimeout(() => location.reload(), 750)}}>
                                                    Despromover</button>
                                                }
                                                
                                                <button onClick={async() => {await api.post('backoffice/deleteStaff', user.username, config);
                                                                            setTimeout(() => location.reload(), 750)}}>
                                                    Eliminar</button>
                                            </td>
                                            
                                        </tr>
                                    </tbody>
                                )
                            }
                        
                    </table>
                </InfiniteScroll>
            </div>
        </div>
    )
}