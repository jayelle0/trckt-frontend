import React from 'react'
import {NavLink} from 'react-router-dom'

class NavBar extends React.Component {
    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                            <NavLink to = "/">Home</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink to = "/clients"> View My Clients</NavLink>
                            </li>
                            {/* <li class="nav-item">
                                <NavLink to="/calendar-form">Create New Calendar</NavLink>
                            </li> */}
                        </ul>
                 
                </nav>
            </div>
        )
    }
}

export default NavBar 
