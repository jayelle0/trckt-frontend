import React from 'react'
import ProjectContainer from '../Container/projectContainer'

class Client extends React.Component {

   

    render() {
        console.log(this.props)
        return (
            <>
            <h1> {this.props.client.name}</h1>
            <ProjectContainer projects = {this.props.client.projects}/> 
            </>
        )
    }
}

export default Client 
