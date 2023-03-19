import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddOwnerForm = () => {
    const initUser = {  userName: '', password: '', firstName: '', lastName: '', email: '', phone: '', roleId: 0, isActive: true};

    const [user, setUser] = useState(initUser);

    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [roleId] = useState(2); // role id for an owner
    const [isActive] = useState("true");

    const handleChange = e => {
        const {name, value} = e.target;
        console.log('e.target.name: ' + name);
        console.log('e.target.value: ' + value);

        switch(name){
            case 'userName':
                setUserName(value);
                break;
            case 'password':
                setPassword(value);
                break;
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
                console.log("Not a valid input. Please try again.");
        }

        setUser({...user, [name]: value});
    }

    const handleSubmit = e => {
        e.preventDefault();

        const data = {userName, password, firstName, lastName, email, phone, roleId, isActive};
        console.log('data', data);

        axios
        .post("http://localhost:8080/user/create", {
            userName: data.userName,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,   
            phone: data.phone,
            roleId: data.roleId,
            isActive: data.isActive
        })

        console.log('data sent for activate user');
        console.log(data);
    }

    return(
        <div className="row">
            <div className="d-flex flex-column justify-content-center">
                <div className="card">
                    <div className="card-header d-flex justify-content-center align-items-center">
                        <form>
                            <label>Username</label>
                            <input className="u-full-width" id="userName" type="text" value={user.userName} name="userName" placeholder="User Name" required onChange={handleChange} />

                            <label>Password</label>
                            <input className="u-full-width" id="password" type="password" value={user.password} name="password" placeholder="Password" required onChange={handleChange} />

                            <label>First Name</label>
                            <input className="u-full-width" id="firstName" type="text" value={user.firstName} name="firstName" placeholder="First Name" required onChange={handleChange} />

                            <label>Last Name</label>
                            <input className="u-full-width" id="lastName" type="text" value={user.lastName} name="lastName" placeholder="Last Name" required onChange={handleChange} />

                            <label>Email</label>
                            <input className="u-full-width" id="email" type="text" value={user.email} name="email" placeholder="email@mail.com" required onChange={handleChange} />

                            <label>Phone</label>
                            <input className="u-full-width" id="phone" type="text" value={user.phone} name="phone" placeholder="###-###-####" required onChange={handleChange} />

                            <button className="button-primary" id="submitButton" type="submit" style={{ backgroundColor: 'red'}} onClick={handleSubmit}>Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddOwnerForm;