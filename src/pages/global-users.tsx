import  {Token } from '../types';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import UnauthorizedAcess from '../Components/UnauthorizedAccess';
import styles from './ranking/rankingtables.module.scss';
import Header from '../Components/Header';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import InfiniteScroll from 'react-infinite-scroll-component'
import { listuserProps } from '../types';

export default function Users() {

    const token = Cookies.getJSON('token');
    const decoded_token: Token = jwt_decode(Cookies.getJSON('token'))

    let role = decoded_token.role;

    if (role == 'USER')
        return (<div><UnauthorizedAcess/></div>)

    
    const [usersReported, setUsersReported] = useState<listuserProps>([]);
    const [uRcursor, setURcursor] = useState<string>(null);
    const [showUR, setShowUR] = useState<boolean>(false);
    const [endUR, setEndUR] = useState<boolean>(true);

    const [usersDisabled, setUsersDisabled] = useState<listuserProps>([]);
    const [uDcursor, setUDcursor] = useState<string>(null);
    const [showUD, setShowUD] = useState<boolean>(false);
    const [endUD, setEndUD] = useState<boolean>(true);

    const [usersSuspended, setUsersSuspended] = useState<listuserProps>([]);
    const [uScursor, setUScursor] = useState<string>(null);
    const [showUS, setShowUS] = useState<boolean>(false);
    const [endUS, setEndUS] = useState<boolean>(true);

    const config = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }

    async function fetchReported() {

        await api.post('backoffice/listreports', uRcursor, config)
                    .then((response) => {

                        console.log("request reported");

                        if(response.data.results.length == 0 ) {
                            setEndUR(false);
                            return;
                        }
                        
                        setUsersReported((current) => 
                            current.concat(response.data.results));

                        setURcursor(response.data.cursorString);

                        setShowUR(true);
                        setShowUD(false);
                        setShowUS(false);

                        console.log(response);
                    })
                    .catch(error => console.log(error));

        setShowUR(true);
        setShowUD(false);
        setShowUS(false);


    }

    async function fetchDisabled() {


        await api.post('backoffice/listdisabled', uRcursor, config)
                    .then((response) => {

                        console.log("request disabled");

                        if(response.data.results.length == 0 ) {
                            setEndUD(false);
                            return;
                        }
                        
                        setUsersDisabled((current) => 
                            current.concat(response.data.results));

                        setUDcursor(response.data.cursorString);

                        setShowUD(true);
                        setShowUR(false);
                        setShowUS(false);

                        console.log(response);
                    })
                    .catch(error => console.log(error));

        setShowUD(true);
        setShowUR(false);
        setShowUS(false);

    }

    async function fetchSuspended() {

        await api.post('backoffice/listsuspended', uRcursor, config)
                    .then((response) => {
                        console.log("request suspended");

                        if(response.data.results.length == 0 ) {
                            setEndUS(false);
                            return;
                        }
                        
                        setUsersSuspended((current) => 
                            current.concat(response.data.results));

                        setUScursor(response.data.cursorString);
                        setShowUR(false);
                        setShowUD(false);
                        setShowUS(true);
                        console.log(response);
                    })
                    .catch(error => console.log(error));

        setShowUR(false);
        setShowUD(false);
        setShowUS(true);

    }

    return (
        <div className={styles.container}>

            <div className={styles.header}>
                <Header/>
            </div> 


            <div className={styles.options}>
                <button onClick={() => fetchReported() } 
                    className={styles.options_buttons}>Contas denunciadas</button>

                <button onClick={() => fetchDisabled() } 
                    className={styles.options_buttons}>Contas inativas</button>

                <button onClick={() => fetchSuspended() } 
                    className={styles.options_buttons}>Contas suspensas</button>
            </div>


            <div className={styles.scoreTable}>

                {showUR ? 

                    <InfiniteScroll
                    dataLength={usersReported.length + 6} 
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
                                            <td>{user.username}</td> 
                                            <td>{user.reports}</td>
                                        </tr>
                                    </tbody>
                                )
                            }
                        </table>
                    </InfiniteScroll>

                    : showUD ? 
                        <InfiniteScroll
                            dataLength={usersReported.length + 6} 
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
                                        </tr>
                                    </tbody>
                                    {usersDisabled.map( (user, index) => 
                                            <tbody key={index}>
                                                <tr>
                                                    <td>{user.username}</td> 
                                                </tr>
                                            </tbody>
                                        )
                                    }
                                </table>
                        </InfiniteScroll>

                    : showUS ?

                        <InfiniteScroll
                            dataLength={usersReported.length + 6}
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
                                        </tr>
                                    </tbody>
                                    {usersSuspended.map( (user, index) => 
                                            <tbody key={index}>
                                                <tr>
                                                    <td>{user.username}</td> 
                                                </tr>
                                            </tbody>
                                        )
                                    }
                                </table>
                        </InfiniteScroll>
                    :

                    null
                }
                
            </div> 
        </div>
    )
}