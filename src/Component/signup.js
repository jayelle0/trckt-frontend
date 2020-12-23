import React from 'react'

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

    render() {
        return (
            <form>
                <h3>Create an account</h3> 
                <input className= "signup-form" type = "text" name= "name" value={this.state.name} onChange = {this.changeHandler} placeholder= "Please include name" /> <br/>
               <input className= "signup-form" type = "email" name= "email" value={this.state.email} onChange = {this.changeHandler} placeholder= "Please include password" /><br/>
               <input className= "signup-form" type = "password" name= "password" value={this.state.password} onChange = {this.changeHandler} placeholder= "Please include email" /><br/>
               <input className= "signup-form" type = "text" name= "address" value={this.state.address} onChange = {this.changeHandler} placeholder= "Please include address" /><br/>
               <input className= "signup-form" type = "tel" name= "phone" value={this.state.phone} onChange = {this.changeHandler} placeholder= "Please include phone #" /><br/>
               <button className= "signup-form" type="submit">Sign Up</button>
            </form> 
        )
    }
}

export default Signup 
