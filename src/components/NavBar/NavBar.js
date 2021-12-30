import React from "react";
import './NavBar.css';
import { Navbar, Nav } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { NavLink, useHistory, Link } from 'react-router-dom';

const NavBar = () => {

  const history = useHistory();

  const logoutUser = ()=>{
    localStorage.clear();
    history.push('/');
  }

  return (
    <Navbar expand='lg' style={{backgroundColor: "#ececec8a", fontFamily:"IBM Plex Sans"}}>
      <Navbar.Brand className="navbar_head">Peer Finder</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className='mr-auto'>
          <Nav.Link className="nav_links" as={Link} to="/home">Home</Nav.Link>
          <Nav.Link className="nav_links" as={Link} to="/user">Profile</Nav.Link>
          <Nav.Link className="nav_links" as={Link} to="/interests">Your Peers</Nav.Link>
          <Nav.Link className="nav_links" as={Link} to="/inbox">Inbox</Nav.Link>
          <Nav.Link className="nav_links" as={Link} to="/favourites">Favourites</Nav.Link>
          <Nav.Link className="nav_links" as={Link} to="/contact">Contact</Nav.Link>
        </Nav>

        <div className="navbar_button">
          <NavLink to="/register"><Button variant="contained" color="success">Create account</Button></NavLink>
        </div>
        
        <div className="navbar_button">
          <Button variant="contained" color="error" onClick={logoutUser}>Log Out</Button>
        </div>
            
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;