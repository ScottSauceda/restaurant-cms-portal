import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import { GetUserInformation } from "../hooks";
import UserDisplay from "../tables/UserDisplay";

const UserPanel = () => {
    const [data, loading] = GetUserInformation(0);
    const [user, setUser] = useState(null);
    localStorage.clear()

    useEffect(() => {
        if(data) {
                console.log("UserPanel data");
                console.log(data);
            const formattedUser = {
                    id: data.users_id,
                    userName: data.userName,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    phone_number: data.phone_number,
                    account_active: '' + data.isActive
                };
            setUser(formattedUser);

        }
    }, [data]);
    
    const addUser = () => {

    }

    const initialUser = { id: null, userName: "", first_name: "", last_name: "", email: "", phone_number: "", account_active: "" };
    const [currentUser, setCurrentUser] = useState(initialUser);


    const editUser = (id, user) => {

    }


    const deactivatingUser = (id, user) => {

    }


    const updateDeactivateUser = (oldUser) => {

    }


    const updateUser = (newUser) => {

    };

    return (
        <div>
            <div className="row">
                {loading || !user ? (
                    <div className = "col-md-9">
                        <p>Loading...</p>
                    </div>
                ): (
                    <div className="col-md-9">
                        <h2>Welcome {user.userName}</h2>
                        <UserDisplay 
                            user={user}
                            deactivatingUser={deactivatingUser}
                            editUser={editUser}
                        />
                    </div>
                )}
            </div>
            <div className = "row">
                    <Link to="/restaurants">View Restaurants</Link>
            </div>
            <div className = "row">
                <Link to="/locations">View Locations</Link>
            </div>
        </div>
    );
};

export default UserPanel;