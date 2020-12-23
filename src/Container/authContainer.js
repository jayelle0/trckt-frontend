import React from 'react'
import { Link} from 'react-router-dom'
import Modal from 'react-modal'
import Signup from '../Component/signup'
import Login from '../Component/login'


class AuthContainer extends React.Component {
    state={
        signupFormIsOpen: false, 
        loginFormIsOpen: false
    }

    customStyles =()=> {
        return {
            content : {
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)',
              width: '180px',
              padding: '50px'
              
            } 
        }
      }


    openSignupForm = () => {
        this.setState({signupFormIsOpen: true})
    }
    openLoginForm = () => {
        this.setState({loginFormIsOpen: true})
    }

    closeSignupForm = () => {
        this.setState({signupFormIsOpen: false})
    }
    closeLoginForm = () => {
        this.setState({loginFormIsOpen: false})
    }
    render() {
        return (
            <>
          <button onClick ={this.openSignupForm}> Sign Up </button> <br/>
          <button onClick ={this.openLoginForm}> Log In </button>
          <Modal isOpen= {this.state.signupFormIsOpen} style={this.customStyles()}  >  
                 <Signup />
                <button className="btn" onClick = {this.closeSignupForm}> Close </button>
             </Modal>
             <Modal isOpen= {this.state.loginFormIsOpen} style={this.customStyles()}  >  
                 <Login />
                <button className="btn" onClick = {this.closeLoginForm}> Close </button>
             </Modal>
          </>
        )
    }
}

export default AuthContainer 
