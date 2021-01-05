import React from 'react'
import TimesheetContainer from '../Container/timesheetContainer'
import Chart from './chart'
import Navbar from '../Container/navBar'
import { Button } from 'semantic-ui-react'
import { Link} from 'react-router-dom'


class Project extends React.Component {



    render() {
    
        return (

            <>         
            <Navbar/>
            <h1>Client: {this.props.client.name} </h1>
            <h5>Project Name: {this.props.project.name}</h5>
            <h5>Payment Terms: {this.props.project.payment_terms}</h5> 
            <h5>Total Hours:   {this.props.project.project_total_hours}</h5>
            <h5>Total Earned: ${this.props.project.project_total_earned}</h5>
            <h5>Complete: {this.props.project.complete? "Yes":"No" }</h5> 
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
