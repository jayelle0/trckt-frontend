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
import ClientForm from './Component/clientForm'

class App extends React.Component {

  componentDidMount = () => {
    this.props.fetchUser()    
  }


  renderProject = (routerProps) => {
    // console.log("routerProps:",  routerProps)
    let projectId =routerProps.match.params.id
    let clientId = routerProps.match.url.split("/")[2]
    let clientObj = this.props.user.clients.find(client => client.id == clientId)
    let projectObj = clientObj.projects.find(project => project.id == projectId)
    // console.log(clientObj)
    return <Project client = {clientObj} project ={projectObj}/>
  }
  
  renderClientContainer = (routerProps) => {
    if (routerProps.location.pathname === "/clients") {
      return <ClientContainer  clients={this.props.user.clients}/>
    }
  }

  render() {
    console.log(this.props)

    return (
      <>
        <Navbar/>
          <div className="App">
             <Switch>
                  <Route exact path ="/clients" render={this.renderClientContainer}/>
                  <Route path="/clients/:id/projects/:id" render={this.renderProject} />               
                  <Route exact path ="/clients/new" render={() => <ClientForm  userId={this.props.user.id} />}/>
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
