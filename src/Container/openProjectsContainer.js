import React from 'react'
import ProjectContainer from './projectContainer'
import Chart from '../Component/chart'

class OpenProjectsContainer extends React.Component{

    allProjects = () => {
        let allProjects = []
        for( let i = 0; i < this.props.user.clients.length;i++){

            for(let j = 0; j < this.props.user.clients[i].projects.length; j++){
               var innerValue = this.props.user.clients[i].projects[j];
               allProjects.push(innerValue)
            }
         }
        // let openProjects = allProjects.filter(projects => projects.complete ===false)
        
        return allProjects
    }


    openProjects = ()  => {
       return this.allProjects().filter(projects => projects.complete ===false)
         

    }

  
    render() {
        // console.log(this.allProjects())
        return (
            <>
              <Chart allProjects={this.allProjects()}/>
              <ProjectContainer projects={this.openProjects()}/>
            </>
        )
    }
}

export default OpenProjectsContainer