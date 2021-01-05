import React from 'react'
import ProjectContainer from './projectContainer'
import Chart from '../Component/chart'
import Navbar from './navBar'
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react'
import ProjectForm from '../Component/projectForm'

class OpenProjectsContainer extends React.Component{
    state = {
        newProjectModal: false 
    }

    allProjects = () => {
        let allProjects = []
        for( let i = 0; i < this.props.user.clients.length;i++){

            for(let j = 0; j < this.props.user.clients[i].projects.length; j++){
               var innerValue = this.props.user.clients[i].projects[j];
               allProjects.push(innerValue)
            }
         }

         allProjects.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
         })
        

        return allProjects
    }


    openProjects = ()  => {
       return this.allProjects().filter(projects => projects.complete ===false)
         

    }

    closeModalForm = () => {
        this.setState({newProjectModal:false})
    }
    openModalForm = () => {
        this.setState({newProjectModal:true})
    }
    

  
    render() {
        // console.log(this.allProjects())
        return (
            <>
            <Navbar/>
            {this.props.user.clients=== undefined? 
            <h1>Projects Loading...</h1>:
            <>
            <h3> Welcome Back {this.props.user.name}! Below are your current projects</h3>
              <Chart allProjects={this.allProjects()}/>
              <br/>
              <br/>
              <ProjectContainer projects={this.openProjects()}/>
              <Modal
                // as ={Form}
                closeIcon
                open={this.state.newProjectModal}
                trigger={<Button color="blue">Add New Project</Button>}
                onClose={this.closeModalForm}
                onOpen={this.openModalForm}
                >
                    <ProjectForm closeFormModal={this.closeModalForm} user={this.props.user}/>
                </Modal>
            </>
            }
            </>
        )
    }
}

export default OpenProjectsContainer