import React from 'react'
import Project from '../Component/project'
class ProjectContainer extends React.Component {

    renderProject = () => { return this.props.projects.map(projectObj => <Project project= {projectObj} key={projectObj.id}/> )

    }
    render() {
        return (
            <>
            <div id = "project-table">
                <span className="project-table-header">Name</span>
                <span className="project-table-header">Hours</span>
                <span className="project-table-header">Total Earned</span>
                <span className="project-table-header"> Completed</span>
                {this.renderProject()}
            </div>
            

            </>
        )
    }
}

export default ProjectContainer 
