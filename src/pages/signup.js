import React from "react";
import AddOwnerForm from "../forms/AddOwnerForm";
import Navbar from "../components/Navbar";

const Signup = () => {
    return (
        <div>
            <Navbar />
            <h1>Signup</h1>
            <AddOwnerForm></AddOwnerForm>
        </div>
    )
}

export default Signup;