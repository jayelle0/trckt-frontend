import './App.css';
import Navbar from './Container/navBar'
import './App.css';
import ClientContainer from './Container/clientContainer'
import React from 'react'
import {connect} from 'react-redux'
import {getUserFromApi} from './Redux/actions'

class App extends React.Component {
  componentDidMount = () => {
    this.props.fetchUser()    
  }

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <Navbar/>
        <ClientContainer clients={this.props.user.clients}/>
      </div>
    );
  }
}

function mdp(dispatch){
  return {fetchUser: () => dispatch(getUserFromApi())}
}

function msp(state){
  return {user: state.user}
}


export default connect(msp,mdp)(App);
