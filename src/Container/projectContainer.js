import React from 'react'
import Project from '../Component/project'
import { BrowserRouter as Router, Route , Switch, withRouter, NavLink} from 'react-router-dom'


class ProjectContainer extends React.Component {

    renderProjects = () => { return this.props.projects.map(projectObj => 
    // <Project project= {projectObj} key={projectObj.id}/> )
    {
        let renderHours = () => { 
        let hoursArray = []
        hoursArray = projectObj.timesheets.map(timesheetobj=> timesheetobj.hours)
        let totalHours = hoursArray.reduce((a, b) => a + b, 0) 
        return totalHours
        }

       let renderTotalEarned = () => {
        let hours = renderHours()
        let totalEarned = projectObj.hourly_fee*hours 
        return totalEarned
        }

        return (

            <>
                <NavLink to={`/projects/${projectObj.id}`}>
                <span>{projectObj.name}</span> 
                </NavLink>
                <span>{renderHours()}</span> 
                <span>{renderTotalEarned()}</span>
     
                <input type="checkbox" id="myCheck" onclick="myFunction()"/>
            </>
        )

    }
    )
    }

    render() {
        console.log(this.props)
        
        return (

        <>
          {  this.props.projects === undefined ? <h1> Loading Projects </h1> :
            <>
            <Router> 
                
            <Route exact path="/projects/:id"
                            render = {({match})=> {
                                let id= parseInt(match.params.id)
                                let foundProject =this.props.projects.find((project)=> project.id === id)
                                return(  <Project project={foundProject}/>)
                        }}
                        />

                <Route exact path = "/clients" render={()=> {
                    return (
                            <>
                            <div id = "project-table">
                                <span className="project-table-header">Name</span>
                                <span className="project-table-header">Hours</span>
                                <span className="project-table-header">Total Earned</span>
                                <span className="project-table-header"> Completed</span>
                                {this.renderProjects()}
                            </div>
                             </>
                    )
                }} />
            </Router>
            </>        
        }
        
        </>
        )
    }
}

export default withRouter(ProjectContainer)