import './App.css';
import Navbar from './Container/navBar'
import './App.css';
import ClientContainer from './Container/clientContainer'
import React from 'react'
import {connect} from 'react-redux'
import {getUserFromApi} from './Redux/actions'
import { BrowserRouter as Router, Route , Switch, withRouter} from 'react-router-dom'
import ProjectContainer from './Container/projectContainer';
import Project from './Component/project';

class App extends React.Component {
  componentDidMount = () => {
    this.props.fetchUser()    
  }


  renderProjects = () => {
    return <ProjectContainer/> 
  }
  
renderProject = () => {
  return  <Project/>
}

  render() {
    console.log(this.props)
    return (
      <>
        <Navbar/>
          <div className="App">
            <Switch> 
                  <Route exact path ="/clients" render={() => <ClientContainer clients={this.props.user.clients}/>}/>
                  <Route exact path ="/projects/:id" component={Project}/>
                  {/* <Route exact path ="/projects" render={this.renderProjects}/> */}
                
            </Switch> 
          </div>
         </>
    );
  }
}

function mdp(dispatch){
  return {fetchUser: () => dispatch(getUserFromApi())}
}

function msp(state){
  return {user: state.user}
}


export default withRouter(connect(msp, mdp)(App));
