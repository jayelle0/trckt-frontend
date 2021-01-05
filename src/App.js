import './App.css';
import ClientContainer from './Container/clientContainer'
import React from 'react'
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route , Switch, withRouter} from 'react-router-dom'
import OpenProjectsContainer from './Container/openProjectsContainer';
import Project from './Component/project';
import Login from './Component/login'
import Signup from './Component/signup'
import InvoiceContainer from './Container/invoiceContainer'
class App extends React.Component {



  renderProject = (routerProps) => {
    let projectId =routerProps.match.params.id
    let clientId = routerProps.match.url.split("/")[2]
    let clientObj = this.props.user.clients.find(client => client.id == clientId)
    let projectObj = clientObj.projects.find(project => project.id == projectId)
    // console.log(clientObj)
    return <Project client = {clientObj} project ={projectObj}/>
  }
  
  renderClientContainer = (routerProps) => {
    if (routerProps.location.pathname === "/clients") {
      return <ClientContainer  clients={this.props.user.clients} userId={this.props.user.id}/>
    }
  }

  render() {
    console.log(this.props)

    return (
      <>
    
          <div className="App">
 
             <Switch>
                  <Route exact path ="/" component= {Login}/>
                  <Route exact path ="/sign-up" component= {Signup}/>
                  <Route exact path ="/invoice" component= {InvoiceContainer} />
                  <Route exact path ="/clients" render={this.renderClientContainer}/>
                  <Route exact path ="/open_projects" render={() => <OpenProjectsContainer user={this.props.user} />}/>
                  <Route path="/clients/:id/projects/:id" render={this.renderProject} />               
             </Switch>  
            
          </div>  
         </>
    );
  }
}



function msp(state){
  return {user: state.user}
}


export default withRouter(connect(msp)(App));
