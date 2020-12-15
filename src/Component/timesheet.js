import React from 'react'

class Timesheet extends React.Component {
    render() {
        return (
            <>
            <span> {this.props.timesheet.date}</span>
            <span> {this.props.timesheet.hours}</span>
            <span>{this.props.timesheet.note} </span>
            <button> Edit </button>
            
            </>
        )
    }
}

export default Timesheet 
