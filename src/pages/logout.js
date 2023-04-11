import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { SignoutUser } from "../hooks";


const Logout = () => {

    // const navigate = useNavigate();
    const [data, loading] = SignoutUser();
    const [ cookie, removeCookie ] = useCookies();

    // console.log("logging out");
    useEffect(() => {


        if(data){
            // console.log('logout called');
            console.log('data');
            console.log(data);
        }

        // navigate("/", {replace: true})
        // window.location.replace("index.html");

    }, [data])

    return (
        <div>Loading...</div>
    )
}

export default Logout;