import React from 'react'
import {connect} from 'react-redux'
import {createClient} from '../Redux/actions'
import { Button, Header, Icon, Modal, Form,   } from 'semantic-ui-react'

class ClientForm extends React.Component {
    state = {
        user_id: this.props.userId, 
        name: "", 
        email: "", 
        address: "", 
        phone: "", 

    }

    changeHandler= (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    submitHandler= (event) => {
        event.preventDefault() 
        this.props.createClient(this.state)
        this.props.closeForm()
        this.setState( {
            user_id: this.props.userId, 
            name: "", 
            email: "", 
            address: "", 
            phone: "", 
    
        })
        
    }
    render() {
        return (
            <>
            <Header content='New Client Form ' />
            <Modal.Content>
            <Form onSubmit= {this.submitHandler}>
                <Form.Group widths='equal'>
                <Form.Input fluid label='Name' placeholder=' name' name= "name" value={this.state.name} onChange = {this.changeHandler}  />   <br/> 
                <br/> 
                <Form.Input fluid label='Email' name= "email" value={this.state.email} onChange = {this.changeHandler} placeholder= "E-Mail"  />     <br/>              
                <Form.Input fluid label='Address' name= "address" value={this.state.address} onChange = {this.changeHandler} placeholder= "Address"   />   <br/> 
                <Form.Input fluid label='Phone' type = "tel" name= "phone" value={this.state.phone} onChange = {this.changeHandler} placeholder= "Phone #"  />  <br/> 
                <Button size="small" color= "blue" type='submit'>Submit</Button>
                </Form.Group>
            
          </Form>

        
            </Modal.Content>
           </>

        )
    }
}

function mdp(dispatch){
    return {createClient: (newClient) => dispatch(createClient(newClient))}
  }
  

export default connect(null,mdp)(ClientForm) 
