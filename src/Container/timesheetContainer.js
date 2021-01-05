import React from 'react'
import TimesheetForm from '../Component/timesheetForm'
import { BrowserRouter as Router, Route , Switch, withRouter} from 'react-router-dom'
import { Grid, Icon, Button, Header, Table} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {deleteTimesheet} from '../Redux/actions'


class TimesheetContainer extends React.Component {

    state = {
        showTimesheetButton: this.props.project.complete
    }


    componentDidUpdate= (prevProps) => {
        if (this.props.timesheets !== prevProps.timesheets) {
            this.renderTimesheets()
        }
    }

    state = {
        showTimesheetForm: false
    }
    renderTimesheets = () => {
        
        return this.props.timesheets.map(timesheetObj=> {
            const deleteHandler = () => {
                {this.props.deleteTimesheet(this.props.project, this.props.clientId,timesheetObj)}
            }
                return(
                <Table.Row>
                    <Table.Cell>{timesheetObj.date}</Table.Cell>
                    <Table.Cell>{timesheetObj.hours}</Table.Cell>
                    <Table.Cell>{timesheetObj.note}</Table.Cell>
                    <Table.Cell>  <button className = "project-delete-btn" onClick ={deleteHandler}> Delete </button></Table.Cell>
                </Table.Row>
                        
                )
            }
        )}

        renderInvoiceTimesheets = () => {
            return this.props.timesheets.map(timesheetObj=> {

                const timesheetEarned = () => {
                   let earned = timesheetObj.hours*this.props.project.hourly_fee
                   return earned
                }

                return(
                    <Table.Row>
                          <Table.Cell>{this.props.project.name}</Table.Cell>
                        <Table.Cell>{timesheetObj.date}</Table.Cell>
                        <Table.Cell>{timesheetObj.note}</Table.Cell>
                        <Table.Cell>{timesheetObj.hours}</Table.Cell>
                        <Table.Cell>{this.props.project.hourly_fee}</Table.Cell>
                        <Table.Cell>{timesheetEarned()}</Table.Cell>
                    </Table.Row>
                )
                }
            )}

    buttonHandler = () => {
        this.setState({showTimesheetForm: true})
    }

    closeTimesheetContainer = () => {
        this.setState({showTimesheetForm: false})
    }
    render() {

        return (
            <>
            <Switch>
           
            <Route path="/clients/:id/projects/:id" render={()=> {
                return ( 
                        <>
                           <Table color="blue" size= "small" compact="very">
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell >Date</Table.HeaderCell>
                            <Table.HeaderCell >Hours</Table.HeaderCell>
                            <Table.HeaderCell >Note</Table.HeaderCell>
                            <Table.HeaderCell >Delete</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                        {this.renderTimesheets()}
                      
                        {this.state.showTimesheetForm? <TimesheetForm closeTimesheetContainer ={this.closeTimesheetContainer} projectId ={this.props.projectId}  clientId ={this.props.clientId} /> : null}
                        </Table.Body>
                    </Table >

             
                  {this.props.project.complete? null: <button onClick = {this.buttonHandler}> Add Timesheet </button>}
                 </>
                )
            }} />
             <Route exact path = "/invoice" render={()=> {
                return ( 
                    <Table color="blue" size= "small" compact="very">
                        <Table.Header>
                            <Table.Row>
                                 <Table.HeaderCell >Project</Table.HeaderCell>
                                <Table.HeaderCell >Date</Table.HeaderCell>
                                <Table.HeaderCell >Note</Table.HeaderCell>
                                <Table.HeaderCell >Hours</Table.HeaderCell>
                                <Table.HeaderCell >Rate</Table.HeaderCell>
                                <Table.HeaderCell >Total</Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.renderInvoiceTimesheets()}
                            <Table.Row>
                                <Table.Cell></Table.Cell>
                                <Table.Cell></Table.Cell>
                                <Table.Cell></Table.Cell>
                                <Table.Cell></Table.Cell>
                                <Table.Cell><strong>Grand Total</strong></Table.Cell>
                                <Table.Cell><strong>${this.props.project.project_total_earned}</strong> </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table >
                )
            }} />
            </Switch> 
            </>
        )
    }
}


function mdp(dispatch){
    return {deleteTimesheet: (delProject, clientId,delTimesheet) => dispatch(deleteTimesheet(delProject, clientId,delTimesheet) )}
  }
  


export default withRouter(connect(null,mdp)(TimesheetContainer));