import React from 'react'
import {NavLink, Link} from 'react-router-dom'

class NavBar extends React.Component {
    render() {
        return (
           
                <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            
                        <ul class="navbar-nav">
                           
                            <li class="nav-item active">
                            <Link to = "/open_projects">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link to = "/clients"> View My Clients</Link>
                            </li> <li class="nav-item" onClick={()=> localStorage.removeItem("token")}>
                                <Link to = "/"> Logout</Link>
                            </li>


                          
                        </ul>
                 
                </nav>
            
        )
    }
}

export default NavBar 
