import React from 'react'
import { BrowserRouter as Router, Route , Switch, withRouter, NavLink} from 'react-router-dom'
import ProjectForm from '../Component/projectForm'
import Modal from 'react-modal'
import {connect} from 'react-redux'
import {updateProjectCompletion, deleteProject} from '../Redux/actions'


class ProjectContainer extends React.Component {
    state = {
        formModalIsOpen: false, 
    }

    componentDidUpdate= (prevProps) => {
        if (this.props.projects !== prevProps.projects) {
            console.log ("props changed")
            this.renderProjects()
        }
    }

    customStyles =()=> {
        return {
            content : {
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)'
            } 
        }
      }

      openModalForm = () => {
        console.log("form was clicked")
        this.setState({formModalIsOpen: true})
      }

    closeFormModal = () => {
        this.setState({formModalIsOpen:false})
    }

    renderProjects = () => { return this.props.projects.map(projectObj => {
       

        const clickHandler = () => {
            this.props.updateProjectCompletion(!projectObj.complete, projectObj.id, projectObj.client_id)
        }

        const deleteHandler = () => {
            this.props.deleteProject (projectObj.id, projectObj.client_id,projectObj.project_total_earned)
        }
            return (
                <>
                            <NavLink to={`/clients/${projectObj.client_id}/projects/${projectObj.id}`}>
                            <span>{projectObj.name}</span> 
                            </NavLink>
                            <span>{projectObj.project_total_hours}</span> 
                            <span>${projectObj.project_total_earned}</span>
                            <input type="checkbox" id="myCheck" checked={projectObj.complete} onChange={clickHandler }/>
                            <button className = "project-delete-btn" onClick ={deleteHandler}> Delete </button>

                        </>
            )
            
        }
    )}


    render() {
        // console.log(this.props)
        return (
        <>
          {  this.props.projects === undefined ? <h1> Loading Projects </h1> :
            <>
            {/* <Router> */}
                <Switch>
                    <Route exact path = "/clients" render={()=> {
                        return (
                                <>
                                <div id = "project-table">
                                    <span className="project-table-header">Name</span>
                                    <span className="project-table-header">Hours</span>
                                    <span className="project-table-header">Total Earned</span>
                                    <span className="project-table-header"> Completed</span>
                                    <span className="project-table-header"> Delete</span>
                                    {this.renderProjects()}
                                </div>
                                    <button onClick={this.openModalForm}> Add Project</button> 
                                    <Modal isOpen= {this.state.formModalIsOpen} style={this.customStyles()} ariaHideApp={false}>  
                                    <ProjectForm clientId = {this.props.clientId} closeFormModal ={this.closeFormModal} />  <br/> 
                                    <button className="btn" onClick = {this.closeFormModal}> Close </button>
                                     </Modal>
                                 </>
                        )
                    }} />

                      <Route exact path = "/open_projects" render={()=> {
                        return (
                                <>
                                <div id = "project-table">
                                    <span className="project-table-header">Name</span>
                                    <span className="project-table-header">Hours</span>
                                    <span className="project-table-header">Total Earned</span>
                                    <span className="project-table-header"> Completed</span>
                                    <span className="project-table-header"> Delete</span>
                                    {this.renderProjects()}
                                </div>
                                    
                                 </>
                        )
                    }} />


                </Switch>
            {/* </Router>  */}
            </>        
        }
        </>
        )
    }
}

function mdp(dispatch){
    return {
        updateProjectCompletion: (updatedProject, projectId, clientId) => dispatch(updateProjectCompletion (updatedProject, projectId, clientId)),
        deleteProject :(projectId, clientId,project_amt)=> dispatch(deleteProject (projectId, clientId,project_amt))
    }
  }



export default withRouter(connect(null, mdp)(ProjectContainer))