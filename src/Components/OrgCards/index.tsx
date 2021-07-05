import Header from '../Header';
import defaultStyles from '../../pages/styles/base.module.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Button, Card, Image } from 'semantic-ui-react'

type Token = {
    username: string,
    tokenID: string,
    role: string,
    creationData: number,
    expirationData: number
  }

export default function Organizations() {

    const token: Token = Cookies.getJSON('token');

    const [orgs, setOrgs] = useState([]);

    useEffect( () => {
        axios.post('https://helpinhand-318217.ey.r.appspot.com/rest/users/listorg', token)
            .then(response => { setOrgs(response.data)})
    }, [])

    return (

        <div className={defaultStyles.Feed}>

            <Card.Group> 
            
                {orgs.map( organization => 

                    <Card key={organization.username}>
                        <Card.Content >
                            <Image
                                floated='right'
                                size='mini'
                            />
                            <Card.Header href="">{organization.name}</Card.Header>
                            <Card.Meta>X Followers</Card.Meta>
                            <Card.Description>{organization.following}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                            <Button>Seguir</Button>
                            </div>
                        </Card.Content>
                    </Card>
                    
                )}

            </Card.Group>
            
        </div>
    )
}