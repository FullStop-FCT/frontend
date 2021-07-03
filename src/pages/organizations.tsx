import Header from '../Components/Header';
import defaultStyles from './styles/base.module.scss';
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
            .then(response => { console.log(response.data);setOrgs[response.data]})
    }, [])

    return (
        <div className={defaultStyles.container}>

            <div className={defaultStyles.header}>
                <Header/>
            </div> 
            

            <div className={defaultStyles.Feed}>
 
                {orgs.map( (organization, index) => 
                    <div key={index}>
                        <p>{organization.name}</p>
                        <a>{organization.location}</a>
                    </div>
                )}


                {/*<Card.Group> 
                
                    {orgs.map( organization => 

                        <Card key={organization.username}>
                            <Card.Content >
                                <Image
                                    floated='right'
                                    size='mini'
                                />
                                <Card.Header>{organization.name}</Card.Header>
                                <Card.Meta>X Followers</Card.Meta>
                                <Card.Description>{organization.location}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Button>Follow</Button>
                            </Card.Content>
                        </Card>
                        
                    )}

                </Card.Group>*/}
                
            </div>
        </div>
    )
}