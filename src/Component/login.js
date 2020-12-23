import React from 'react'

class Login extends React.Component {
    state= {
        email: "", 
        password: "",  
    }

    changeHandler= (event) => {
        this.setState({[event.target.name]: event.target.value})
    }


    render() {
        return (
            <form>
           <input className= "signup-form" type = "email" name= "email" value={this.state.email} onChange = {this.changeHandler} placeholder= "Please include password" /><br/>
           <input className= "signup-form" type = "password" name= "password" value={this.state.password} onChange = {this.changeHandler} placeholder= "Please include email" /><br/>
           <button className= "signup-form" type="submit">Log In</button>
        </form> 
        )
    }
}

export default Login 
