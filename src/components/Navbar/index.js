import React, {  useState, useEffect } from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {

    return (

            <nav className="navbar navbar-expand-sm bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand m-sm-1 text-light" href="/">Restaurant Management</a>
                </div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link text-light" href="/signup" >Signup</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light" href="/login" >Login</a>
                        </li>
                    </ul>
                     
            </nav>
        
    );
};

export default Navbar;