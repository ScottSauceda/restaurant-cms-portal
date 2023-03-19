import React, {  useState, useEffect } from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {

    return (

            <nav class="navbar navbar-expand-sm bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand m-sm-1 text-light" href="/">Restaurant Management</a>
                </div>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link text-light" href="/signup" >Signup</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-light" href="/login" >Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-light" href="/logout" >Logout</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-light" href="/dashboard" >Dashboard</a>
                        </li>
                    </ul>
                     
            </nav>
        
    );
};

export default Navbar;