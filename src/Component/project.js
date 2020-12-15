import React from 'react'
import { NavLink } from 'react-router-dom'
import TimesheetContainer from '../Container/timesheetContainer'


class Project extends React.Component {


    renderHours = () => { 
        let hoursArray = []
        hoursArray = this.props.project.timesheets.map(timesheetobj=> timesheetobj.hours)
        let totalHours = hoursArray.reduce((a, b) => a + b, 0) 
        return totalHours
    }

    renderTotalEarned = () => {
        let hours = this.renderHours()
        let totalEarned = this.props.project.hourly_fee*hours 
        return totalEarned
    
    }

    render() {
        console.log(this.props)
        // console.log(typeof this.renderHours())
        return (

            <>
            <h5>Project Name: {this.props.project.name}</h5>
            <h5>Total Hours:   {this.renderHours()}</h5>
            <h5>Total Earned: {this.renderTotalEarned()}</h5>
            <TimesheetContainer timesheets = {this.props.project.timesheets}/>
            
            </>
        )
    }
}

export default Project 
