import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const initUser = {  username: '', password: ''};


    const navigate = useNavigate();


    const [user, setUser] = useState(initUser);

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const handleChange = e => {
        const {name, value} = e.target;
        console.log('e.target.name: ' + name);
        console.log('e.target.value: ' + value);

        switch(name){
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;

            default:
                console.log("Not a valid input. Please try again.");
        }

        setUser({...user, [name]: value});
    }

    const handleSubmit = e => {
        e.preventDefault();

        const data = {username, password};
        console.log('data', data);

        axios
        .post("http://localhost:8080/user/login", {
            username: data.username,
            password: data.password
        })
        .then((response) => {
            console.log('response from login');
            console.log(response.data);

            if(response.data) {
            
                console.log("UserPanel data");
                console.log(data);
    
                // const formattedUser = {
                //         id: data.usersId,
                //         userName: data.username,
                //         firstName: data.firstName,
                //         lastName: data.lastName,
                //         email: data.email,
                //         phone: data.phone,
                //         isActive: '' + data.isActive
                // };
                // setUser(formattedUser);

                // console.log("formattedUser");
                // console.log(formattedUser);

                            sessionStorage.setItem("userLoginStatus", "true");
                            sessionStorage.setItem('userId', response.data.usersId);

                navigate("/dashboard", { state: { id: response.data.usersId }});

    
            }

            


            // sessionStorage.setItem("userLoginStatus", "true");
            // sessionStorage.setItem('userId', this.user.usersId.toLocaleString());
            // sessionStorage.setItem('username', this.user.userName);

            // console.log('session: loginStatus');
            // console.log(sessionStorage.getItem('userLoginStatus'));

            // console.log('session: userId');
            // console.log(sessionStorage.getItem('userId'));
            
            // console.log('session: username');
            // console.log(sessionStorage.getItem('username'));

            // window.location.replace("/user/"+sessionStorage.getItem('userId'));

        })
        .catch((error) => {
            if(error.response){
                console.log("server responded");
                console.log(error.request)
            } else if(error.request){
                console.log("network error");
            } else {
                console.log(error);
            }
        });
        

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
                            <input className="u-full-width" id="username" type="text" value={user.username} name="username" placeholder="User Name" required onChange={handleChange} />

                            <label>Password</label>
                            <input className="u-full-width" id="password" type="password" value={user.password} name="password" placeholder="Password" required onChange={handleChange} />

                            <button className="button-primary" id="submitButton" type="submit" style={{ backgroundColor: 'red'}} onClick={handleSubmit}>Log In</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;