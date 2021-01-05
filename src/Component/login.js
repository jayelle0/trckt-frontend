import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import {NavLink, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUserFromApi} from '../Redux/actions'
import { withRouter } from "react-router-dom";

class Login extends React.Component {
    state= {
        email: "", 
        password: "",  
    }

    changeHandler= (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    submitHandler = (event) => {
        event.preventDefault() 
        this.props.fetchUser(this.state)    
        this.setState({ email: "", 
        password: "",  })
        this.props.history.push('/open_projects')
    }

    render() {
        return (
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                   Log-in to your account
                </Header>
                <Form size='large' onSubmit ={this.submitHandler}>
                    <Segment stacked>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name= "email" value={this.state.email} onChange = {this.changeHandler}  />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        name= "password" value={this.state.password} onChange = {this.changeHandler}
                    />
            
                    <Button color='teal' fluid size='large'>
                        Login
                    </Button>
                    </Segment>
                </Form>
                <Message>
                    New?   <Link to = "/sign-up">Sign Up!</Link>
                </Message>
                </Grid.Column>
            </Grid>
        )
    }
}


function mdp(dispatch){
  return {fetchUser: (loginUser) => dispatch(getUserFromApi(loginUser))}
}


export default connect(null,mdp)(Login) 
