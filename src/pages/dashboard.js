import React, { useState, useEffect } from "react";
import UserPanel from "../panels/UserPanel";

const Dashboard = () => {

    const [userView, setUserView] = useState(false);

    // setUserView(true);

    return (
        <div className="container-lg">
            <h1>Dashboard</h1>
            <UserPanel></UserPanel>
        </div>
    )
}

export default Dashboard;