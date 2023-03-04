import React, { useState, useEffect } from "react";

import { GetUserInformation } from "../hooks";
import UserDisplay from "../tables/UserDisplay";

const UserPanel = () => {
    const [data, loading] = GetUserInformation(0);
    const [users, setUsers] = useState(null);
    // const [user, setUser] = useState(null);
    localStorage.clear()

    useEffect(() => {
        if(data) {
                console.log("UserPanel data");
                console.log(data);
            const formattedUsers = data.map((obj,i) => {
            // const formattedUser = data(obj) => {
                return {
                    id: obj.users_id,
                    userName: obj.userName,
                    first_name: obj.first_name,
                    last_name: obj.last_name,
                    email: obj.email,
                    phone_number: obj.phone_number,
                    account_active: '' + obj.isActive
                };
            });
            setUsers(formattedUsers);
            // setUser(formattedUser);
            // console.log("UserPanel users");
            // console.log(formattedUser);
        }
    // }, [data]);
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
        <div className="row">
            <div className="col-md-3">
                <h2>Edit User</h2>
            </div>
            {loading || !users ? (
                <div className = "col-md-9">
                    <p>Loading...</p>
                </div>
            ): (
                <div className="col-md-9">
                    <h2>View user</h2>
                    <UserDisplay 
                        users={users}
                        // user={user}
                        deactivatingUser={deactivatingUser}
                        editUser={editUser}
                    />
                </div>
            )}
        </div>
    );
};

export default UserPanel;