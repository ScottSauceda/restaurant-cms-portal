import React from "react";
import Navbar from "../components/Navbar";
import LoginForm from "../forms/LogInForm";

const Login = () => {
    return (
        <div>
            <Navbar />
            <h1>Login</h1>
            <LoginForm />
        </div>
    )
}

export default Login;