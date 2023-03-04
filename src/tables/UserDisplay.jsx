import React from 'react';
import UserDisplayEntry from '../components/UserDisplayEntry';

const UserDisplay = (props) => {
    let activeState = "";
    console.log("HEEEEERRRRREEEEEE!!!!!")
    console.log("UserDisplay props");
    console.log(props);
    return (
        <div className="d-flex flex-column justify-content-center">
            {
                props.users.length > 0 ? (
                    props.users.map(user => {
                        console.log("user");
                        console.log(user);

                        if(user.account_active === "true"){
                            activeState = "Deactivate"
                        } else {
                            activeState = "Activate";
                        }

                        return (
                            <UserDisplayEntry 
                            user = {user}
                            />
                        )
                    })
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