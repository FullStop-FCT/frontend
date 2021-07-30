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

    
    const [usersSuspended, setUsersSuspended] = useState<listuserProps>([]);
    const [uScursor, setUScursor] = useState<string>(null);
    const [endUS, setEndUS] = useState<boolean>(true);

    const config = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }

    useEffect(() => {
        fetchSuspended();
      }  
      , [])

    async function fetchSuspended() {

        await api.post('backoffice/listsuspended', uScursor, config)
                    .then((response) => {

                        console.log(response);
                        if(response.data.results.length == 0 ) {
                            setEndUS(false);
                            return;
                        }
                        
                        setUsersSuspended((current) => 
                            current.concat(response.data.results));

                        console.log(response);

                        setUScursor(response.data.cursorString);
                    })
                    .catch(error => console.log(error));
    }

    return (
        <div className={styles.container}>

            <div className={styles.header}>
                <Header/>
            </div> 


            <div className={styles.options}>
                <button onClick={() => router.push('/global-users/reported') } 
                    className={styles.options_buttons}>Contas denunciadas</button>

                <button onClick={() => router.push('/global-users/disabled') } 
                    className={styles.options_buttons}>Contas inativas</button>

                <button onClick={() => fetchSuspended() } 
                    className={styles.options_buttons}>Contas suspensas</button>
            </div>


            <div className={styles.scoreTable}>

                <InfiniteScroll
                    dataLength={usersSuspended.length * 6}
                    next={fetchSuspended}
                    hasMore={endUS}
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
                                </tr>
                            </tbody>
                            {usersSuspended.map( (user, index) => 
                                    <tbody key={index}>
                                        <tr>
                                            <td><a href={`${user.username}`}>{user.username}</a></td> 
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