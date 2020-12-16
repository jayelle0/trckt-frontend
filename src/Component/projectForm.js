import React from 'react'
import {connect} from 'react-redux'
import {createProject} from '../Redux/actions'

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

    formHandler = (event) => {
        event.preventDefault()
        this.props.createProject(this.state, this.props.clientId)
        console.log("form is submitted") 
        this.setState({
            name: "", 
            payment_terms: "", 
            hourly_fee: "", 
            client_id: this.props.clientId
        })
        this.props.closeFormModal()
    }
    
    render() {
        //  console.log(this.props)
        return (
             <>
                <input type = "text" name = "name" value = {this.state.date} onChange = {this.changeHandler} placeholder = "Include Project Name" /> <br/> 
                <input type = "number" name = "payment_terms" value = {this.state.hours} onChange = {this.changeHandler} placeholder = "Include Project Payment Terms"/> <br/> 
                <input type = "number" name = "hourly_fee" value = {this.state.note} onChange = {this.changeHandler } placeholder = "Include Project Hourly Fee"/> <br/> 
                <input type = "submit" value = "Add New Project" onClick = {this.formHandler}/> <br/> 
            </>
        )
    }
}

function mdp(dispatch){
    return {createProject: (newProject, clientId) => dispatch(createProject(newProject, clientId))}
  }
  

export default connect(null,mdp)(ProjectForm) 
