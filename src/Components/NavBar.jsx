import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavLink, } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom'
import AddContactsForm from "./addContacts/addContactsForm";

const NavBar = () => {

  return (
    <div>
      <Navbar className='NavBar'>

        <Nav className="nav-link" navbar>
          <NavLink><Link exact to="/">Home</Link></NavLink>
          <NavLink><Link to="/create"> Add New Contact</Link></NavLink>
        </Nav>
      </Navbar >
    </div >
  );
}

export default NavBar;