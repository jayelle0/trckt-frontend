import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {addUser} from '../Redux/actions'

class Signup extends React.Component {
    state= {
        name: "", 
        email: "", 
        password: "",
        address: "", 
        phone: "", 
    }

    changeHandler= (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    submitHandler = (event) => {
        event.preventDefault() 
        this.props.addUser(this.state)
        this.setState({
            name: "", 
            email: "", 
            password: "",
            address: "", 
            phone: "", 
        }
    )
        this.props.history.push('/clients')
    }

    render() {
        return (
  
            <Form onSubmit ={this.submitHandler}>
                <Form.Group widths='equal'>
                <Form.Input fluid label='Name' placeholder='Name' name= "name" value={this.state.name} onChange = {this.changeHandler}  />  <br/> 
                <Form.Input fluid label='Email' name= "email" value={this.state.email} onChange = {this.changeHandler} placeholder= "E-Mail"  />     <br/>              
                <Form.Input fluid label='Password' type = "password" name= "password" value={this.state.password} onChange = {this.changeHandler} placeholder= "Password"  />  <br/> 
                <Form.Input fluid label='Address' name= "address" value={this.state.address} onChange = {this.changeHandler} placeholder= "Address"   />   <br/> 
                <Form.Input fluid label='Phone' type = "tel" name= "phone" value={this.state.phone} onChange = {this.changeHandler} placeholder= "Phone #"  />  <br/> 
                <Button type='submit'>Submit</Button>
                

                </Form.Group>
            
          </Form>
        )
    }
}

function mdp(dispatch){
    return {addUser: (newUser) => dispatch(addUser(newUser))}
  }

export default  connect(null,mdp)(Signup)  
