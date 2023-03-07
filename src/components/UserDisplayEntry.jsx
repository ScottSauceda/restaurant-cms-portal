import React from "react";

const UserDisplayEntry = (props) => {
    console.log("UserDisplayEntry props")
    console.log(props);
    return (
        <div className="card">
            <div className="card-header d-flex justify-content-center align-items-center">
                <h5 className="m-0">{props.user.firstName + " " + props.user.lastName}</h5>
                <div className="flex-fill"></div>
                <button className="btn btn-primary me-2" onClick={() => props.editUser(props.user.id, props.user)}>Edit</button>
                <button className="btn btn-primary me-2" onClick={() => props.deactivatingUser(props.user.id, props.user)}>{props.activeState}</button>
                <button className="btn btn-primary me-2" data-bs-toggle="collapse" data-bs-target={"#user-" + props.user.id}>Expand</button>
            </div>
            <div className="card-body collapse" id={"user-" + props.user.id}>
                <div className = "d-flex flex-wrap justify-content-center">
                    <p className="p-2"><b>ID:</b> {props.user.id}</p>
                    <p className="p-2"><b>Username:</b> {props.user.userName}</p>
                    <p className="p-2"><b>First Name:</b> {props.user.firstName}</p>
                    <p className="p-2"><b>Last Name:</b> {props.user.lastName}</p>
                    <p className="p-2"><b>Email:</b> {props.user.email}</p>
                    <p className="p-2"><b>Phone:</b> {props.user.phone}</p>
                    <p className="p-2"><b>Account Active:</b> {props.user.isActive}</p>
                </div>
            </div>
        </div>
    )
}

export default UserDisplayEntry;