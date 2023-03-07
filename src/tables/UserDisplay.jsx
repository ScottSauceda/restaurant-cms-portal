import React from 'react';
import UserDisplayEntry from '../components/UserDisplayEntry';

const UserDisplay = (props) => {
    let activeState = "";
    console.log("UserDisplay props");
    console.log(props.user);

    if(props.user.isActive === "true"){
        activeState = "Deactivate";
    } else {
        activeState = "Activate";
    }

    // console.log("activeState");
    // console.log(activeState);

    return (
        <div className="d-flex flex-column justify-content-center">
            {
                props.user ? (
                    <UserDisplayEntry 
                        user = {props.user}
                        editUser = {props.editUser}
                        deactivatingUser = {props.deactivatingUser}
                        activeState = {activeState}
                    />
                ) : (
                    <div>
                        <p>No user to display</p>
                    </div>
                )
            }
        </div>
    )
}

export default UserDisplay;