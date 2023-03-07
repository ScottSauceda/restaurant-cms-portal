import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/signup">
                        Sign Up
                    </NavLink>
                    <NavLink to="/login">
                        Log In
                    </NavLink>
                    <NavLink to="/dashboard">
                        Dashboard
                    </NavLink>
                    <NavLink to="/restaurants">
                        Restaurants
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;