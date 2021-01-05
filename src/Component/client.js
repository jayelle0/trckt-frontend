import React from 'react'
import ProjectContainer from '../Container/projectContainer'
import { Card } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'


class Client extends React.Component {


    state = {
        showProjects: false 
    }

    showProjectsHandler = () => {
       this.props.openProjectHandler(this.props.client)
    }

    render() {
        // console.log(this.props)
        return (
            <>
            <Card onClick= {this.showProjectsHandler}>
            <Card.Content>
                <Card.Header>{this.props.client.name}</Card.Header>
                <Card.Meta>Email: {this.props.client.email}</Card.Meta>
                <Card.Description>
                Address: {this.props.client.address}
                <br></br>
                Phone: {this.props.client.phone}
                </Card.Description>
            </Card.Content>
            </Card>
 
            </>
        )
    }
}

export default Client 
