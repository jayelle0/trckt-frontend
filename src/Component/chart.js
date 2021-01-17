import React from "react"
// import {G2,Chart,Tooltip,Interval,} from "bizcharts";
import { BrowserRouter as Router, Route , Switch, withRouter, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, Text} from 'recharts';
import domtoimage from 'dom-to-image';
import fileDownload from "js-file-download";
import {Button} from 'semantic-ui-react'

class AppCharts extends React.Component {

    handleSaveClick = () => {
        domtoimage.toBlob(document.getElementById('chart'))
           .then(function (blob) {
              fileDownload(blob, 'dom-to-image.png');
           });
       }


       clientTotalEarned = () => {

         return this.props.user.clients.map(client => {
          const totalEarned =  () =>  {return client.client_completed_earned+client.client_incomplete_earned}
          return(Object.assign(client, {client_total_earned:totalEarned()})) }
          );
       }

       topFiveClient = () => { 
         const sortedClients = () =>{
            return this.clientTotalEarned().sort(function(a, b) {
              
              if (a.client_total_earned > b.client_total_earned) {
                return -1;
              }
              if (a.client_total_earned < b.client_total_earned) {
                return 1;
              }
              return 0;
            });
          }

          return sortedClients().slice(0,5)
       }


   
    render() {
        console.log(this.topFiveClient())
   
        return (
            <>

                           <h1>Top 5 Clients</h1> 
                         <div id="chart">
                          
                        <BarChart
                        width={750}
                        height={350}
                        data={this.topFiveClient()}
                        margin={{
                          top: 20, right: 50, left: 20, bottom: 20,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" name ="Client" angle={-45} textAnchor="end" height={60}/>
                        <YAxis 
                         width={90}
                        orientation='left'
                        label={
                               <Text
                              x={0}
                              y={0}
                              dx={50}
                              dy={150}
                              offset={0}
                              angle={-90}
                          >$ Earned</Text>}/>
                        <Tooltip />
                        <Legend />
                     
                        <Bar dataKey="client_completed_earned" name= "Completed Projects" stackId="a" fill="#455d85" />
                        <Bar dataKey="client_incomplete_earned" name= "Incomplete Projects" stackId="a" fill="#6f97d9" />
                      </BarChart>
                      <br/>
                  
                      </div>
                      <Button  onClick={this.handleSaveClick}> Save Chart! </Button>
                     

            </>

        )
    }
}


function msp(state){
    return {user: state.user}
  }
  


  export default withRouter(connect(msp)(AppCharts));
