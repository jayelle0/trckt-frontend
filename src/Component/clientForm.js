import React from 'react'
import {connect} from 'react-redux'
import {createClient} from '../Redux/actions'
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
        
    }
    render() {
        return (
           <form onSubmit= {this.submitHandler}> 
               <input type = "text" name= "name" value={this.state.name} onChange = {this.changeHandler} placeholder= "Client Name" /> <br/>
               <input type = "email" name= "email" value={this.state.email} onChange = {this.changeHandler} placeholder= "Client Email" /><br/>
               <input type = "text" name= "address" value={this.state.address} onChange = {this.changeHandler} placeholder= "Client Address" /><br/>
               <input type = "tel" name= "phone" value={this.state.phone} onChange = {this.changeHandler} placeholder= "Client Phone" /><br/>
               <button type="submit">Submit New Client</button> 
           </form>
        )
    }
}

function mdp(dispatch){
    return {createClient: (newClient) => dispatch(createClient(newClient))}
  }
  

export default connect(null,mdp)(ClientForm) 
