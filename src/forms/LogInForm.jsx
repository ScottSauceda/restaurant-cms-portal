import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const initUser = {  username: '', password: ''};


    const navigate = useNavigate();


    const [user, setUser] = useState(initUser);

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

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
        .post("http://localhost:8080/api/auth/signin", {
        // .post("http://spring-boot-dev.us-east-1.elasticbeanstalk.com/api/auth/signin", {
            username: data.username,
            password: data.password
        })
        .then((response) => {
            console.log('response from login');
            console.log(response.data);

            if(response.data) {
            
                
                if(response.data.username && response.data.roles[0] == "ROLE_OWNER"){
                    console.log("user has role of owner, set sessionStore values and redirect to dashboard");
                    

                    localStorage.setItem("user", JSON.stringify(response.data));
                
                    return response.data;
    
                    // navigate("/profile", { state: { id: response.data.id }});
                } else {
                    console.log("user is not an owner, display bad credentials message on login");

                    // alert("bad credentials")
                    // setErrorMessage("bad credentials");
                }

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

            console.log("unspecified error");
            console.log(error.response.data.message);
            setErrorMessage(error.response.data.message);
            // setErrorMessage("bad credentials");

            // if(error.response){
            //     console.log("server responded");
            //     console.log(error.response)
            // } else if(error.request){
            //     console.log("network error");
            //     console.log(error.requeset);
            // } else {
            //     console.log("unspecified error");
            //     console.log(error);
            // }
        });
        

        console.log('data sent for login user');
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
                            <div></div>

                            <div style={{color: 'red'}} >&nbsp;{errorMessage}</div>

                            {/* <button>Signup</button> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;