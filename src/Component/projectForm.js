import React from 'react'
import {connect} from 'react-redux'
import {createProject} from '../Redux/actions'
import { Button, Header, Icon, Modal, Form,   } from 'semantic-ui-react'
import { BrowserRouter as Router, Route , Switch, withRouter, NavLink} from 'react-router-dom'

class ProjectForm extends React.Component {
    state = {
       name: "", 
       payment_terms: "", 
       hourly_fee: "", 
        client_id: this.props.clientId
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    dropDownHandler  = (e, { value }) => {
    console.log("e:", e )
    console.log("value:", value )
    this.setState({ client_id: value })
}

    formHandler = (event) => {
        event.preventDefault()
        this.props.createProject(this.state)
        console.log("form is submitted") 
        this.setState({
            name: "", 
            payment_terms: "", 
            hourly_fee: "", 
            client_id: this.props.clientId
        })
        this.props.closeFormModal()
    }
    
    clientList = () => {
        
        return this.props.user.clients.map(client => {
            const container = {};

            container.key = client.id;
            container.text = client.name;
            container.value = client.id;
            return container;
       })
         

   
    }
    
    render() {
         console.log(this.state)
        return (
            <>
            <Switch> 
            <Route exact path = "/clients" render={()=> {
                     return (
                        <>
            
                        <Header content='New Project Form ' />
                        <Modal.Content>
                            <Form onSubmit= {this.formHandler}>
                                <Form.Group widths='equal'>
                                <Form.Input fluid label='Name' placeholder='Name' name= "name" value={this.state.name} onChange = {this.changeHandler}  />   <br/> 
                                <br/> 
                                <Form.Input fluid label='Payment Terms' name= "payment_terms" value={this.state.payment_terms} onChange = {this.changeHandler} placeholder= "Payment Terms"  />     <br/>              
                                <Form.Input fluid label='Hourly Fee' name= "hourly_fee" value={this.state.hourly_fee} onChange = {this.changeHandler} placeholder= "Hourly Fee"   />   <br/> 
            
                                <Button size="small" color= "blue" type='submit'>Add New Project</Button>
                                </Form.Group>
                            
                            </Form>
                        </Modal.Content>
                        
                        </>
                     )
            }} />
            <Route exact path = "/open_projects" render={()=> {
                     return (
                        <>
                        
                        <Header content='New Project Form' />
                        <Modal.Content>
                            <Form onSubmit= {this.formHandler}>
                                <Form.Group widths='equal'>
                                
                                <Form.Input fluid label='Name' placeholder='Name' name= "name" value={this.state.name} onChange = {this.changeHandler}  />   <br/> 
                                <br/> 
                                <Form.Select
                                    fluid
                                    label='Client'
                                    name = 'client_id'
                                    options={this.clientList()}
                                    placeholder='Client'
                                    onChange = {this.dropDownHandler}
                                    value={this.state.client_id}
                                    
                                />
                                <Form.Input fluid label='Payment Terms' name= "payment_terms" value={this.state.payment_terms} onChange = {this.changeHandler} placeholder= "Payment Terms"  />     <br/>              
                                <Form.Input fluid label='Hourly Fee' name= "hourly_fee" value={this.state.hourly_fee} onChange = {this.changeHandler} placeholder= "Hourly Fee"   />   <br/> 
                                
                                <Button size="small" color= "blue" type='submit'>Add New Project</Button>
                                </Form.Group>
                            
                            </Form>
                        </Modal.Content>
                        
                        </>
                     )
            }} />

            </Switch>
            </>
        )
    }
}

function mdp(dispatch){
    return {createProject: (newProject) => dispatch(createProject(newProject))}
  }
  

export default connect(null,mdp)(ProjectForm) 
