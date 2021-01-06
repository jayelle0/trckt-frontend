import React from 'react'
import TimesheetContainer from '../Container/timesheetContainer'
import Chart from './chart'
import Navbar from '../Container/navBar'
import { Button, Image, Item, Icon, Header} from 'semantic-ui-react'
import { Link} from 'react-router-dom'


class Project extends React.Component {



    render() {
    
        return (
            <>      
            <Navbar/>
            <br/>
                <div id= "project-description">
                <Header as='h1'>
                <Icon name='user' size="large" circular="true"/> {this.props.client.name}
                </Header>
                <Header as='h3'>Project: {this.props.project.name}
                    <Header.Subheader>
                        Payment Terms: {this.props.project.payment_terms} <br/>
                        Total Hours:   {this.props.project.project_total_hours} <br/>
                        Total Earned: ${this.props.project.project_total_earned}<br/>
                        Complete: {this.props.project.complete? "Yes":"No" } <br/>
                    </Header.Subheader>
                </Header>
                </div>
           
                 <TimesheetContainer timesheets = {this.props.project.timesheets} projectId ={this.props.project.id}  clientId ={this.props.client.id} project= {this.props.project}/>
            <br/> 
            <br/>
           <Button><Link  to={{
                pathname: `/invoice`, 
                query:{client: this.props.client, project: this.props.project}
              }}> Create An Invoice</Link></Button>  
            </>
        )
    }
}

export default Project 
