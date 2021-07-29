import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import UnauthorizedAcess from '../../Components/UnauthorizedAccess';
import styles from '../ranking/rankingtables.module.scss';
import Header from '../../Components/Header';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import InfiniteScroll from 'react-infinite-scroll-component'
import { Token, listuserProps } from '../../types';
import { useRouter } from 'next/router';

export default function Users() {

    const router = useRouter();

    const token = Cookies.getJSON('token');
    const decoded_token: Token = jwt_decode(Cookies.getJSON('token'))

    let role = decoded_token.role;

    if (role == 'USER')
        return (<div><UnauthorizedAcess/></div>)

    
    const [usersReported, setUsersReported] = useState<listuserProps>([]);
    const [uRcursor, setURcursor] = useState<string>(null);
    const [endUR, setEndUR] = useState<boolean>(true);

    const config = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }

    useEffect(() => {
        fetchReported();
      }  
      , [])

    async function fetchReported() {

        await api.post('backoffice/listreports', uRcursor, config)
                    .then((response) => {

                        console.log(response);
                        if(response.data.results.length == 0 ) {
                            setEndUR(false);
                            return;
                        }
                        
                        setUsersReported((current) => 
                            current.concat(response.data.results));

                        console.log(response);

                        setURcursor(response.data.cursorString);
                    })
                    .catch(error => console.log(error));
    }

    return (
        <div className={styles.container}>

            <div className={styles.header}>
                <Header/>
            </div> 


            <div className={styles.options}>
                <button onClick={() => fetchReported() } 
                    className={styles.options_buttons}>Contas denunciadas</button>

                <button onClick={() => router.push('/global-users/disabled') } 
                    className={styles.options_buttons}>Contas inativas</button>

                <button onClick={() => router.push('/global-users/suspended')  } 
                    className={styles.options_buttons}>Contas suspensas</button>
            </div>


            <div className={styles.scoreTable}>

                <InfiniteScroll
                dataLength={usersReported.length * 6} 
                next={fetchReported}
                hasMore={endUR}
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
                                <th>Denúncias Recebidas</th>
                            </tr>
                        </tbody>
                        {usersReported.map( (user, index) => 
                                <tbody key={index}>
                                    <tr>
                                        <td><a href={`${user.username}`}>{user.username}</a></td> 
                                        <td>{user.reports}</td>
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