import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import DeactivateUserForm from "../forms/DeactivateUserForm";
import EditUserForm from "../forms/EditUserForm";

import { GetUserInformation } from "../hooks";
import UserDisplay from "../tables/UserDisplay";

const UserPanel = () => {



            console.log('session: loginStatus');
            console.log(sessionStorage.getItem('userLoginStatus'));

            console.log('session: userId');
            console.log(sessionStorage.getItem('userId'));

    const [data, loading] = GetUserInformation(0, sessionStorage.getItem('userId'));
    const [user, setUser] = useState(null);
    localStorage.clear()



    useEffect(() => {
        if(data) {
            
            console.log("UserPanel data");
            console.log(data);

            const formattedUser = {
                    id: data.usersId,
                    userName: data.userName,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    isActive: '' + data.isActive
            };
            setUser(formattedUser);

        }
    }, [data]);
    

    const[editing, setEditing] = useState(false);
    const [deactivating, setDeactivating] = useState(false);

    const initialUser = { id: null, userName: "", firstName: "", lastName: "", email: "", phone: "", isActive: "" };
    const [currentUser, setCurrentUser] = useState(initialUser);

    const editUser = (id, user) => {
        setEditing(true);
        setCurrentUser(user);
    }

    const deactivatingUser = (id, user) => {
        setDeactivating(true);
        setCurrentUser(user);
    }

    const updateDeactivateUser = (oldUser) => {
        setCurrentUser(oldUser);
        setDeactivating(false);
    }


    const updateUser = (newUser) => {
        setCurrentUser(newUser);
        setEditing(false);
    };

    return (
        <div>
            <div className="row">
                <div col-md-3>
                    {deactivating ? (
                        <div>
                            <h2>Set Active</h2>
                            <DeactivateUserForm 
                                currentUser={currentUser}
                                setDeactivating={setDeactivating}
                                updateDeactivateUser={updateDeactivateUser}
                            />
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
                            <h2>User </h2>
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
                    <Link to="/restaurants" >View Restaurants</Link>
            </div>
        </div>
    );
};

export default UserPanel;