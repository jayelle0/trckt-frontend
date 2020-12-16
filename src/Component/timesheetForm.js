import React from 'react'
import {connect} from 'react-redux'
import {createTimesheet} from '../Redux/actions'

class TimesheetForm extends React.Component {
    state = {
        date: "", 
        hours: "", 
        note: "", 
        project_id: this.props.projectId
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.createTimesheet(this.state, this.props.clientId, this.props.projectId)
        this.props.closeTimesheetContainer()
        this.setState({
            date: "", 
            hours: "", 
            note: "", 
            project_id: this.props.projectId
        })
    }
    
    render() {
        // console.log(this.props)
        return (
             <>
                <input type = "date" name = "date" value = {this.state.date} onChange = {this.changeHandler} placeholder = "Work Date" />
                <input type = "number" name = "hours" value = {this.state.hours} onChange = {this.changeHandler} placeholder = "Hours worked" />
                <input type = "text" name = "note" value = {this.state.note} onChange = {this.changeHandler}placeholder = "Include All Notes" />
                <input type = "submit" value = "Submit Timesheet" onClick = {this.submitHandler} />
            </>
        )
    }
}

function mdp(dispatch){
    return {createTimesheet: (newTimesheet, clientId, projectId) => dispatch(createTimesheet(newTimesheet, clientId, projectId))}
  }
  

export default connect(null,mdp)(TimesheetForm) 
