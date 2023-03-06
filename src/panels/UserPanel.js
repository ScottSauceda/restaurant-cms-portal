import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import EditUserForm from "../forms/EditUserForm";

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
                    id: data.users_Id,
                    userName: data.userName,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    account_active: '' + data.isActive
                };
            setUser(formattedUser);

        }
    }, [data]);
    
    const addUser = () => {

    }

    const[editing, setEditing] = useState(false);
    const [deactivating, setDeactivating] = useState(false);

    const initialUser = { id: null, userName: "", firstName: "", lastName: "", email: "", phone: "", account_active: "" };
    const [currentUser, setCurrentUser] = useState(initialUser);


    const editUser = (id, user) => {
        setEditing(true);
        setCurrentUser(user);
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
                <div col-md-3>
                    {deactivating ? (
                        <div>
                            <h2>Set Active</h2>
                        </div>
                    ): editing? (
                        <div>
                            <h2>Edit User</h2>
                            <EditUserForm 
                                currentUser={currentUser}
                                setEditing={setEditing}
                                updateUser={updateUser}
                            />
                        </div>
                    ): (
                        <div>
                            <h2>Add User</h2>
                        </div>
                    )}
                </div>
                {loading || !user ? (
                    <div className = "col-md-9">
                        <p>Loading...</p>
                    </div>
                ): (
                    <div className="col-md-9">
                        <h2>Welcome {user.userName}, UserId {user.id}</h2>
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