import React from 'react'
import NavBar from './navBar'
import domtoimage from 'dom-to-image';
import fileDownload from "js-file-download";
import {connect} from 'react-redux'
import { Grid, Icon, Button, Header, Table} from 'semantic-ui-react'
import moment from "moment";
import TimesheetContainer from './timesheetContainer'



class InvoiceContainer extends React.Component{
    state={
        curTime : moment().format("MM-DD-YYYY"),
      }
      
    handleSaveClick = () => {
        domtoimage.toBlob(document.getElementById('invoice'))
           .then(function (blob) {
              fileDownload(blob, 'dom-to-image.png');
           });
       }

    render() {
        console.log(this.props)
        return(
            <>
            <NavBar/>
            <br/>
            <div id= "invoice" >
            <Grid >
                <Grid.Row>
                    <Grid.Column floated='left' width={5}>
                    <Header as="h2">{this.props.user.name}
                    <Header.Subheader>{this.props.user.address}</Header.Subheader>
                    <Header.Subheader>{this.props.user.email}</Header.Subheader>
                    <Header.Subheader>{this.props.user.phone}</Header.Subheader>
                    </Header >
                    </Grid.Column>
                    <Grid.Column floated='right' width={5}>
                    <Header size="huge" color="blue"> Invoice</Header >
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column floated='left' width={5}>
                    <Table color="blue" size= "small" compact="very">
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell >Bill To</Table.HeaderCell>
                            
                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                        <Table.Row>
                            <Table.Cell>{this.props.location.query.client.name} </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>{this.props.location.query.client.address} </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>{this.props.location.query.client.email} </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>{this.props.location.query.client.phone} </Table.Cell>
                        </Table.Row>
                      
                        </Table.Body>
                    </Table >
                    </Grid.Column>
                    <Grid.Column floated='right' width={5}>
                    <Table celled="true">

                    <Table.Body >
                        <Table.Row>
                            <Table.Cell><strong>Invoice # </strong></Table.Cell>
                            <Table.Cell> </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell><strong>Invoice Total</strong></Table.Cell>
                            <Table.Cell> ${this.props.location.query.project.project_total_earned}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell><strong>Date</strong></Table.Cell>
                            <Table.Cell> {this.state.curTime}</Table.Cell>
                        </Table.Row>
                        </Table.Body>
                    </Table>
                    
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column stretched="true">
                         <TimesheetContainer timesheets = {this.props.location.query.project.timesheets} projectId ={this.props.location.query.project.id}  clientId ={this.props.location.query.client.id} project= {this.props.location.query.project}/>
                    </Grid.Column>
                </Grid.Row>
              
                
            </Grid>
            </div>
            <br/>
            <button onClick={this.handleSaveClick}> Download Invoice </button>

            </>
        )
    }
}

function msp(state){
    return {user: state.user}
  }
  
  
  export default (connect(msp)(InvoiceContainer));
  