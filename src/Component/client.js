import React from 'react'
import ProjectContainer from '../Container/projectContainer'

class Client extends React.Component {

    state = {
        showProjects: false 
    }

    showProjectsHandler = () => {
        this.setState({showProjects: !this.state.showProjects})
    }

    render() {
        // console.log(this.props)
        return (
            <>
            <h1 onClick= {this.showProjectsHandler}> {this.props.client.name}</h1>
            {this.state.showProjects?  <ProjectContainer  clientId ={this.props.client.id} projects = {this.props.client.projects}/>:  null}
            {/* <ProjectContainer projects = {this.props.client.projects}/>  */}
            </>
        )
    }
}

export default Client 
