import React, { useState, useEffect } from 'react';
import UserView from "../panels/UserView";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import { Route, Redirect } from 'react-router-dom';

const Profile = (props) => {

    useEffect(() => {
        console.log("props from userview");
        console.log(props);
    })

    return (
        <div>
            <div className="container-lg">
                <h1>User Profile</h1>
                <UserView/>
            </div>
        </div>
    )
}

export default Profile;