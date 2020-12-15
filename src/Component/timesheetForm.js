import React from 'react'

class TimesheetForm extends React.Component {
    state = {
        date: "", 
        hours: "", 
        note: ""
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    render() {
        return (
             <>
                <input type = "date" name = "date" value = {this.state.date} onChange = {this.changeHandler} placeholder = "Hours worked" />
                <input type = "number" name = "hours" value = {this.state.hours} onChange = {this.changeHandler}/>
                <input type = "text" name = "note" value = {this.state.note} onChange = {this.changeHandler}/>
                <input type = "submit" value = "Submit Timesheet"/>
            </>
        )
    }
}

export default TimesheetForm 
