import React from "react"
// import {G2,Chart,Tooltip,Interval,} from "bizcharts";
import { BrowserRouter as Router, Route , Switch, withRouter, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
  


class AppCharts extends React.Component {

   
    render() {
        console.log(this.props.user.clients)
   
        return (
            <>
            <Switch> 
                 <Route exact path = "/open_projects" render={()=> {
                     return (
                        <BarChart
                        width={500}
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
                        <Bar dataKey="client_completed_earned" stackId="a" fill="#8884d8" />
                        <Bar dataKey="client_incomplete_earned" stackId="a" fill="#82ca9d" />
                      </BarChart>
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
