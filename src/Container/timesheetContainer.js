import React from 'react'
import Timesheet from '../Component/timesheet'
import TimesheetForm from '../Component/timesheetForm'

class TimesheetContainer extends React.Component {

    state = {
        showTimesheetForm: false
    }
    renderTimesheets = () => {
        return this.props.timesheets.map(timesheetObj=> <Timesheet key = {timesheetObj.id} timesheet ={timesheetObj} />)
    }

    buttonHandler = () => {
        this.setState({showTimesheetForm: true})
    }
    render() {

        return (
            <>
            <div id = "timesheet-table">
                
                <span className="timesheet-table-header">Date</span>
                <span className="timesheet-table-header">Hours</span>
                <span className="timesheet-table-header"> Note</span>
                <span> </span>
                {this.renderTimesheets()}
                {this.state.showTimesheetForm? <TimesheetForm/> : null}


            </div>
                <button onClick = {this.buttonHandler}> Add Timesheet </button>
             </>
        )
    }
}

export default TimesheetContainer 
