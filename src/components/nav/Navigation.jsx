import React, { Component } from "react";
import { 
    NavItem,
    NavLink,
    Nav,
    Navbar
} from "reactstrap";

const Navigation = () => {
  return (
        <Navbar expand="md" color="light" light>
            <Nav className="" navbar>
            <NavItem className="">
                <NavLink href='/inscription'>Inscription</NavLink>
            </NavItem>
            <NavItem className="">
                <NavLink href='/connection'>Connection</NavLink>
            </NavItem>
            <NavItem className="">
                <NavLink href='/'>Acceuil</NavLink>
            </NavItem>
            <NavItem className="">
                <NavLink href='/Classement'>Classement</NavLink>
            </NavItem>
            <NavItem className="">
                <NavLink href='/Salon'>Salon</NavLink>
            </NavItem>
            </Nav>
        </Navbar>
  );
};

export default Navigation;