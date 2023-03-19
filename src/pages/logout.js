import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("logging out");
        sessionStorage.clear();
        navigate("/", {replace: true})
        // window.location.replace("index.html");

    }, [])

    return (
        <div>Loading...</div>
    )
}

export default Logout;