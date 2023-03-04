import React from 'react';
import UserDisplayEntry from '../components/UserDisplayEntry';

const UserDisplay = (props) => {
    let activeState = "";
    // console.log("HEEEEERRRRREEEEEE!!!!!")
    // console.log("UserDisplay props");
    // console.log(props.user);

    if(props.user.account_active === "true"){
        activeState = "Deactivate";
    } else {
        activeState = "Activate";
    }

    return (
        <div className="d-flex flex-column justify-content-center">
            {
                props.user ? (

                        <UserDisplayEntry 
                            user = {props.user}
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