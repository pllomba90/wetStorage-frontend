import React from "react";
import "./Navbar.css"
import { Navbar, NavbarBrand, Nav, NavLink } from "reactstrap";
import { redirect } from "react-router-dom";

const Navigation = () => {
    const handleLogout = () =>{
        localStorage.clear();
        redirect("/");
    }
    const token = localStorage.getItem("token");
    if (!token){
        return (
            <div className="container-fluid">
            <Navbar className="my-2" color="secondary" >
            <Nav pills>
                <NavbarBrand  href="/">Norumbega Oyster</NavbarBrand>
                
                    <NavLink href="/">Login</NavLink>
                    <NavLink href="/">Signup</NavLink>
                </Nav>
            </Navbar>
        </div>

        );
    }
    return (
        <div className="container-fluid">
            <Navbar className="my-2" color="secondary" >
            <Nav pills>
                <NavbarBrand  href="/">Norumbega Oyster</NavbarBrand>
                
                    <NavLink href="/grades">Grades</NavLink>
                    <NavLink href="/downriver_strg">Downriver Storage</NavLink>
                    <NavLink href="/" onClick={handleLogout}>Logout</NavLink>
                </Nav>
            </Navbar>
        </div>
    );
};

export default Navigation;
