import React from "react"
// import {G2,Chart,Tooltip,Interval,} from "bizcharts";
import { BrowserRouter as Router, Route , Switch, withRouter, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line,} from 'recharts';
import domtoimage from 'dom-to-image';
import fileDownload from "js-file-download";

class AppCharts extends React.Component {

    handleSaveClick = () => {
        domtoimage.toBlob(document.getElementById('chart'))
           .then(function (blob) {
              fileDownload(blob, 'dom-to-image.png');
           });
       }


   
    render() {
        console.log(this.props)
   
        return (
            <>
                         <div id="chart">
                        <BarChart
                        width={650}
                        height={300}
                        data={this.props.user.clients}
                        margin={{
                          top: 20, right: 30, left: 20, bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" name ="Client"/>
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="client_completed_earned" name= "Completed Earned" stackId="a" fill="#8794C7" />
                        <Bar dataKey="client_incomplete_earned" name= "Earned - Incomplete Project" stackId="a" fill="#ffbf80" />
                      </BarChart>
                      </div>
                      <button onClick={this.handleSaveClick}> Save Chart! </button>

            </>

        )
    }
}


function msp(state){
    return {user: state.user}
  }
  


  export default withRouter(connect(msp)(AppCharts));
