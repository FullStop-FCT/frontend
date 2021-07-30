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

    
    const [usersDisabled, setUsersDisabled] = useState<listuserProps>([]);
    const [uDcursor, setUDcursor] = useState<string>(null);
    const [endUD, setEndUD] = useState<boolean>(true);

    const config = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }

    useEffect(() => {
        fetchDisabled();
      }  
      , [])

    async function fetchDisabled() {

        await api.post('backoffice/listdisabled', uDcursor, config)
                    .then((response) => {

                        console.log(response);
                        if(response.data.results.length == 0 ) {
                            setEndUD(false);
                            return;
                        }
                        
                        setUsersDisabled((current) => 
                            current.concat(response.data.results));

                        console.log(response);

                        setUDcursor(response.data.cursorString);
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

                <button onClick={() => fetchDisabled() } 
                    className={styles.options_buttons}>Contas inativas</button>

                <button onClick={() => router.push('/global-users/suspended') } 
                    className={styles.options_buttons}>Contas suspensas</button>
            </div>


            <div className={styles.scoreTable}>

                <InfiniteScroll
                    dataLength={usersDisabled.length * 6} 
                    next={fetchDisabled}
                    hasMore={endUD}
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