import React from 'react'

class Project extends React.Component {

// name, hours, total earned, completed 
    renderHours = () => { 
        let hoursArray = []
        hoursArray = this.props.project.timesheets.map(timesheetobj=> timesheetobj.hours)
        let totalHours = hoursArray.reduce((a, b) => a + b, 0) 
        // this.renderTotalEarned(totalHours)
        // console.log("hours passed")
        return totalHours
    }

    renderTotalEarned = (hours) => {
        hours = this.renderHours()

        let totalEarned = this.props.project.hourly_fee*hours 
        return totalEarned
    
    }

    render() {
        // console.log(this.props)
        // console.log(typeof this.renderHours())
        return (

            <>
                <span>{this.props.project.name}</span> 
                <span>{this.renderHours()}</span> 
                <span>{this.renderTotalEarned()}</span>
     
                <span></span> 
            </>
        )
    }
}

export default Project 
