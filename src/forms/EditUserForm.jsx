import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUserForm = (props) => {
    console.log("editUserForm props")
    console.log(props);
    useEffect(() => {
        setUser(props.currentUser)
    }, [props])

    const [user, setUser] = useState(props.currentUser);
    const [users_id] = useState(props.currentUser.id);
    const [userName, setUserName] = useState(props.currentUser.userName);
    const [firstName, setFirstName] = useState(props.currentUser.firstName);
    const [lastName, setLastName] = useState(props.currentUser.lastName);
    const [email, setEmail] = useState(props.currentUser.email);
    const [phone, setPhone] = useState(props.currentUser.phone);
    // const [isActive, setIsActive] = useState.currentUser.isActive; // setting active status of account will be its own thing


    const handleChange = e => {
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

    const handleSubmit = e => {
        e.preventDefault();
        if(user.userName) props.updateUser(user);
        const data = {firstName, lastName, email, phone};

        axios
            .put("http://localhost:8080/profile/update/2", {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })

        // window.location.reload();
    }

    return (
        <form>
            <label>Username(read only)</label>
            <input className="u-full-width" id="userName" type="text" value={user.userName} name="userName" readOnly />

            <label>First Name</label>
            <input className="u-full-width" id="firstName" type="text" value={user.firstName} name="firstName" placeholder="First Name" onChange={handleChange} />

            <label>Last Name</label>
            <input className="u-full-width" id="lastName" type="text" value={user.lastName} name="lastName" placeholder="Last Name" onChange={handleChange} />

            <label>Email</label>
            <input className="u-full-width" id="email" type="text" value={user.email} name="email" olaceholder="user@mail.com" onChange={handleChange} />

            <label>Phone</label>
            <input className="u-full-width" id="phone" type="text" value={user.phone} name="phone" placeholder='###-###-####' onChange={handleChange} />
            

            <button className="button-primary" id="submitButton" type="submit" onClick={handleSubmit}>Save user</button>
            <button type="submit" onClick={() => props.setEditing(false)}>Cancel</button>

        </form>
    )
}

export default EditUserForm;