import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import logo from '../Component/logo4.png'
// import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import { Menu, Image, Dropdown, Sticky} from 'semantic-ui-react'

class NavBar extends React.Component {
    render() {
        return (
            <>     
            <Sticky>

           <Menu size="massive" >
           <Menu.Item id="img-item">
            <img src={logo} width="100%" height="100%"/>
            </Menu.Item>
                <Menu.Menu color ="black" position='right' vertical>
                    <Dropdown item text='Menu'>
                    <Dropdown.Menu>
                        <Dropdown.Item className ="dropdown-li" ><Link to = "/open_projects">Home</Link></Dropdown.Item>
                        <Dropdown.Item className ="dropdown-li" ><Link to = "/clients"> View My Clients</Link> </Dropdown.Item>
                        <Dropdown.Item  className ="dropdown-li" onClick={()=> localStorage.removeItem("token")}>    <Link to = "/"> Logout</Link></Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
            </Menu.Menu> 
            </Menu>
         </Sticky>
    
    
          </>
            
        )
    }
}

export default NavBar 
