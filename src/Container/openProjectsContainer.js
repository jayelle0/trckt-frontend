import React from 'react'
import ProjectContainer from './projectContainer'

class OpenProjectsContainer extends React.Component{

    openProjects = () => {
        let allProjects = []
        for( let i = 0; i < this.props.user.clients.length;i++){

            for(let j = 0; j < this.props.user.clients[i].projects.length; j++){
               var innerValue = this.props.user.clients[i].projects[j];
               allProjects.push(innerValue)
            }
         }
        let openProjects = allProjects.filter(projects => projects.complete ===false)
        return openProjects
    }

    

    // renderOpenProjects = () => {
    //     return this.openProjects().map(projectObj => <Project clientId={this.props.user.clients.filter(client => client.id===projectObj.client_Id).id} projects ={projectObj}/>)
        
    // }
  
    render() {
        return (
            <>
              <ProjectContainer projects={this.openProjects()}/>
            </>
        )
    }
}

export default OpenProjectsContainer