import React from 'react'
import Client from '../Component/client'
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route , Switch, withRouter} from 'react-router-dom'
import Chart from "../Component/chart"
import { Card } from 'semantic-ui-react'
import ProjectContainer from './projectContainer'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'
import ClientForm from '../Component/clientForm'
import Navbar from './navBar'
import {scroller  } from "react-scroll";


class ClientContainer extends React.Component {

    state = {
        showProjects: false, 
        client: {},
        clientForm:false, 
    }

    renderClients = () => {return this.props.clients.map(clientObj=> <Client  client={clientObj} key={clientObj.id} openProjectHandler={this.openProjectHandler}/> ) }

    openProjectHandler = (client) => {
        this.setState({showProjects: true, client: client})
        scroller.scrollTo('client-project-div', {
            duration: 1500,
            delay: 100,
            smooth: true,
            offset: 50
        })
    }

    closeClientForm = () => {
        this.setState({clientForm:false})
    }
    openClientForm = () => {
        this.setState({clientForm:true})
    }
    

    render() {
        
        return (
         <>
            <Navbar/>
            { this.props.clients === undefined ? <h1> Loading Clients </h1>:
                 <>
                 {/* <Chart/>  */}
                 <br/> 
                 <br/> 
                 <Card.Group itemsPerRow={3}>
                {this.renderClients()}
                </Card.Group>
                <br/>
                <Modal
                // as ={Form}
                closeIcon
                open={this.state.clientForm}
                trigger={<Button color="blue">Add New Client</Button>}
                onClose={this.closeClientForm}
                onOpen={this.openClientForm}
                >
                    <ClientForm closeForm={this.closeClientForm} userId={this.props.userId}/>
                </Modal>
                <br/>
                <br/>
                 {this.state.showProjects?  <ProjectContainer  client ={this.state.client} projects = {this.state.client.projects}/>:  null}
                </>
            }
         </>
        )
             
    }
}



export default withRouter(ClientContainer)
