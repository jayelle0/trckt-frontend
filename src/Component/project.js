import React from 'react'
import { NavLink } from 'react-router-dom'
import TimesheetContainer from '../Container/timesheetContainer'
import Chart from './chart'



class Project extends React.Component {


    // renderHours = () => { 
    //     let hoursArray = []
    //     hoursArray = this.props.project.timesheets.map(timesheetobj=> timesheetobj.hours)
    //     let totalHours = hoursArray.reduce((a, b) => a + b, 0) 
    //     return totalHours
    // }

    // renderTotalEarned = () => {
    //     let hours = this.renderHours()
    //     let totalEarned = this.props.project.hourly_fee*hours 
    //     return totalEarned
    
    // }

    render() {
        console.log(this.props)
        // console.log(typeof this.renderHours())
        return (

            <>         
            <Chart currentProject={this.props.project}/> 
            <h1>Client: {this.props.client.name} </h1>
            <h5>Project Name: {this.props.project.name}</h5>
            <h5>Payment Terms: {this.props.project.payment_terms}</h5> 
            <h5>Total Hours:   {this.props.project.project_total_hours}</h5>
            <h5>Total Earned: ${this.props.project.project_total_earned}</h5>
            <h5>Complete: {this.props.project.complete? "Yes":"No" }</h5> 
            <TimesheetContainer timesheets = {this.props.project.timesheets} projectId ={this.props.project.id}  clientId ={this.props.client.id} project= {this.props.project}/>
            
            </>
        )
    }
}

export default Project 
