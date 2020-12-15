import React from 'react'
import Client from '../Component/client'
import {connect} from 'react-redux'
import { BrowserRouter as Router, Route , Switch, withRouter} from 'react-router-dom'


class ClientContainer extends React.Component {

    renderClients = () => {return this.props.clients.map(clientObj=> <Client client={clientObj} key={clientObj.id}/> )

    }

    render() {
        console.log(this.props)
        return (
          
         <>
            { this.props.clients === undefined ? <h1> Loading Clients </h1>:
                 <>
                {this.renderClients()}
                </>
            }
         </>
        )
             
    }
}



export default withRouter(ClientContainer)
