import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from 'react-router-dom';
// import EditUserForm from "../forms/EditUserForm"
// import DeactivateUserForm from "../forms/DeactivateUserForm";
import AuthService from "../services/auth.service";

// console.log(process.env.REACT_APP_DEV_BASE_URL);
// console.log(process.env.REACT_APP_BASE_PROD_BASE_URL);

import { GetUserInformation } from "../hooks";
import axios from 'axios';

// const API_URL = "http://spring-boot-dev.us-east-1.elasticbeanstalk.com/api/";


const UserView = () => {
    const currentUser = AuthService.getCurrentUser();

    console.log("currentUser");
    console.log(currentUser);
    const [data, loading] = GetUserInformation(0, currentUser.id);


    const [user, setUser] = useState(null);


    // profile update state
    const [editing, setEditing] = useState(false);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [editResponseMessage, setEditResponseMessage] = useState(null);
    const [editErrorMessage, setEditErrorMessage] = useState(null);

    // activate / deactivate
    const [deactivating, setDeactivating] = useState(false);
    const [isActive, setIsActive] = useState("");
    const [confirmUserName, setConfirmUserName] = useState("");
    const [activeState, setActiveState] = useState("");
    const [disabledStatus, setDisabledStatus] = useState(true);
    const [activateResponseMessage, setActivateResponseMessage] = useState(null);
    const [activateErrorMessage, setActivateErrorMessage] = useState(null);


    useEffect(() => {
        // data from GetUserInformation
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

            console.log('useEffect for activeState')
            // deactivate user
            if(data.isActive == true){
                console.log(data.isActive == true);
                console.log("isActive = true");
                setActiveState("Deactivate");
            } else {
                console.log("isActive = false");
                setActiveState("Activate");
            }
        } else {
            console.log("no user to load");
        }
    }, [data]);



    const handleProfileChange = e => {
        const {name, value} = e.target;

        console.log('e.target.name: ' + name);
        console.log('e.target.value ' + value);

        //input validation
        // let button = document.getElementById('submitButton');
        // let first_nameInput = document.getElementById('first_name');
        // let last_nameInput = document.getElementById('last_name');
        // let emailInput = document.getElementById('email');
        // let phone_numberInput = document.getElementById('phone_number');

        switch(name){
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;        
            case 'email':
                setEmail(value);
                break;        
            case 'phone':
                setPhone(value);
                break;        
            default:
                console.log("Not a valid input option. Please try again.")
        }
        
        setUser({...user, [name]: value});
    }


    const handleActiveChange = e => {
        const {name, value} = e.target;

        console.log('e.target.name: ' + name);
        console.log('e.target.value ' + value);
        let button = document.getElementById('submitButton');
        let userNameInput = document.getElementById('userName');
        // console.log('userNameInput', userNameInput);
        let deactivateUserInput = document.getElementById('deactivateUser');
        console.log('deactivateUserInput', deactivateUserInput);
        let activateUserInput = document.getElementById('activateUser');
        console.log('activateUser', activateUserInput);

        switch(name){
            case 'deactivateUser':
                console.log("setting to false");
                setIsActive(false);
                setConfirmUserName(value);
                if(user.userName == deactivateUserInput.value){
                    button.style.opacity = "1";
                    setDisabledStatus(false);
                }
                break;
            case 'activateUser':
                console.log("setting to true");
                setIsActive(true);
                setConfirmUserName(value);
                if(user.userName == activateUserInput.value){
                    button.style.opacity = "1";
                    setDisabledStatus(false);
                }
                break;
            default:
                console.log("Your input is not valid. Please try again.")
        }

        setUser({...user, [name]: value});
    }


    const handleProfileSubmit = e => {
        e.preventDefault();
        // const data = {id, firstName, lastName, email, phone};

        axios
        .put(process.env.REACT_APP_DEV_BASE_URL +  "profile/update", 
        {
            usersId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
        },  
        { 
            withCredentials: true 
        })
        .then((response) => {
            console.log(response);
            console.log(response.data);
            setEditResponseMessage(response.data);
        })
        .catch((error) => {
            console.log(error);
            console.log("unspecified error");
            console.log(error.response.data);
            setEditErrorMessage(error.response.data);
        })
    }

    const handleActiveSubmit = e => {
        e.preventDefault();
        const data = {isActive};

        console.log('user activate/decativate');
        console.log(user);
        console.log(isActive);

        axios
        .put(process.env.REACT_APP_DEV_BASE_URL + "user/setActive", {
            usersId: user.id,
            userName: user.userName,
            isActive: data.isActive
        },  
        { 
            withCredentials: true 
        })
        .then((response) => {
            console.log(response);
            console.log(response.data);
            setActivateResponseMessage(response.data);
        })
        .catch((error) => {
            console.log(error);
            console.log("unspecified error");
            console.log(error.response.data);
            setActivateErrorMessage(error.response.data);
        })
    }


    return(
        <div>
            {loading || !user ? (
                <div className = "col-md-9">
                    <p>Loading...</p>
                </div>
            ): editing? (
                <form>
                <h2>Edit Profile</h2>
                <label>Username(read only)</label>
                <input className="u-full-width" id="userName" type="text" value={user.userName} name="userName" readOnly />
    
                <label>First Name</label>
                <input className="u-full-width" id="firstName" type="text" value={user.firstName} name="firstName" placeholder="First Name" onChange={handleProfileChange} />
    
                <label>Last Name</label>
                <input className="u-full-width" id="lastName" type="text" value={user.lastName} name="lastName" placeholder="Last Name" onChange={handleProfileChange} />
    
                <label>Email</label>
                <input className="u-full-width" id="email" type="text" value={user.email} name="email" placeholder="user@mail.com" onChange={handleProfileChange} />
    
                <label>Phone</label>
                <input className="u-full-width" id="phone" type="text" value={user.phone} name="phone" placeholder='###-###-####' onChange={handleProfileChange} />
                
    
                <button className="button-primary" id="submitButton" type="submit" onClick={handleProfileSubmit}>Save Changes</button>
                &nbsp;
                <button className="button-primary" type="submit" onClick={() => setEditing(false)}>Cancel Edit</button>
                <div style={{color: 'red'}} >&nbsp;{editErrorMessage}</div>
                <div>&nbsp;{editResponseMessage}</div>
            </form> 
            ) : deactivating? (
                <form>
                    <h2>Account Active</h2>
                    <label>UserId(read only)</label>
                    <input className="u-full-width" type="text" value={user.id} name="id" readOnly />

                    <label>UserName(read only)</label>
                    <input className="u-full-width" type="text" value={user.userName} name="userName" readOnly />

                    {activeState == "Deactivate" ? (
                        <div>
                            <label>Type UserName To Deactivate</label>
                            <input className="u-full-width" id="deactivateUser" type="text" value={confirmUserName} name="deactivateUser" placeholder="Type Username" onChange={handleActiveChange} />
                        </div>
                    ) : (
                        <div>
                            <label>Type UserName To Activate</label>
                            <input className="u-full-width" id="activateUser" type="text" value={confirmUserName} name="activateUser" placeholder="Type Username" onChange={handleActiveChange} />
                        </div>
                    )}
                    <button className="button-primary" id="submitButton" type="submit" onClick={handleActiveSubmit} style={{ opacity: 0.2 }} disabled={disabledStatus} >{activeState} User</button>
                    &nbsp;
                    <button className="button-primary" type="submit" onClick={() => setDeactivating(false)} >Cancel Edit</button>
                    <div style={{color: 'red'}} >&nbsp;{activateErrorMessage}</div>
                    <div>&nbsp;{activateResponseMessage}</div>
                </form>
            ) : (
                <div className="row">
                    <div className="d-flex flex-column justify-content-center">
                        <div className="card">
                            <div className="card-header d-flex justify-content-center align-items-center">
                                <form>
                                    <p className="p-2"><b>ID:</b> {user.id}</p>
                                    <p className="p-2"><b>Username:</b> {user.userName}</p>
                                    <p className="p-2"><b>First Name:</b> {user.firstName}</p>
                                    <p className="p-2"><b>Last Name:</b> {user.lastName}</p>
                                    <p className="p-2"><b>Email:</b> {user.email}</p>
                                    <p className="p-2"><b>Phone:</b> {user.phone}</p>
                                    <p className="p-2"><b>Account Active:</b> {user.isActive}</p>
                                </form>
                                </div>
                                {/* <button className="btn btn-primary me-2" onClick={() => props.editUser(props.user.id, props.user)}>Edit</button>
                                <button className="btn btn-primary me-2" onClick={() => props.deactivatingUser(props.user.id, props.user)}>{props.activeState}</button> */}
                                <button className="btn btn-primary me-2" onClick={() => setEditing(true)}>Edit</button>
                                <button className="btn btn-primary me-2" onClick={() => setDeactivating(true)}>Active/Deactivate</button>
                            </div>
                    </div>
                </div>
            )}            
        </div>
    )
}

export default UserView;