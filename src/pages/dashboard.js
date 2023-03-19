import React, { useState, useEffect } from "react";
import UserPanel from "../panels/UserPanel";
import Navbar from "../components/Navbar";
import { Route, Redirect } from 'react-router-dom';

const Dashboard = (props) => {



    useEffect(() => {
            console.log("props from login form");
            console.log(props);


    })

    return (
        <div className="container-lg">
            <h1>Dashboard</h1>
            <UserPanel></UserPanel>
        </div>
    )
}

export default Dashboard;