import React from 'react'
import {NavLink, Link} from 'react-router-dom'

class NavBar extends React.Component {
    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                            <Link to = "/">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link to = "/clients"> View My Clients</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/clients/new">Add A New Client</Link>
                            </li>
                        </ul>
                 
                </nav>
            </div>
        )
    }
}

export default NavBar 
