import React from "react";
import Navbar from "../components/Navbar";
import LoginForm from "../forms/LogInForm";

const Login = () => {
    console.log("document cookie");
    console.log(document.cookie);
    return (
        <div>
            <Navbar />
            <h1>Login</h1>
            <LoginForm />
        </div>
    )
}

export default Login;