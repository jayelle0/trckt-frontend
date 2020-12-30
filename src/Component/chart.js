import React from "react"
// import {G2,Chart,Tooltip,Interval,} from "bizcharts";
import { BrowserRouter as Router, Route , Switch, withRouter, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line,} from 'recharts';
  


class AppCharts extends React.Component {


   
    render() {
        console.log(this.props)
   
        return (
            <>
            <Switch> 
                 <Route exact path = "/open_projects" render={()=> {
                     return (
                        <BarChart
                        width={650}
                        height={300}
                        data={this.props.user.clients}
                        margin={{
                          top: 20, right: 30, left: 20, bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="client_completed_earned" name= "Completed Earned" stackId="a" fill="#8884d8" />
                        <Bar dataKey="client_incomplete_earned" name= "Earned - Incomplete Project" stackId="a" fill="#82ca9d" />
                      </BarChart>
                     )
                 }} />

                <Route exact path = "/clients" render={()=> {
                     return (
                        <BarChart
                        width={650}
                        height={300}
                        data={this.props.user.clients}
                        margin={{
                          top: 20, right: 30, left: 20, bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="client_completed_earned" name= "Completed Earned" stackId="a" fill="#8884d8" />
                        <Bar dataKey="client_incomplete_earned" name= "Earned - Incomplete Project" stackId="a" fill="#82ca9d" />
                      </BarChart>
                     )
                 }} />
                  <Route path="/clients/:id/projects/:id" render={()=> {
                     return (
                        <LineChart
                        width={500}
                        height={300}
                        data={this.props.currentProject.timesheets}
                        margin={{
                          top: 5, right: 30, left: 20, bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date"  />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="hours" stroke="#8884d8" activeDot={{ r: 8 }} />
    
                      </LineChart>
                     )
                 }} />

              </Switch> 
            </>

        )
    }
}


function msp(state){
    return {user: state.user}
  }
  


  export default withRouter(connect(msp)(AppCharts));
