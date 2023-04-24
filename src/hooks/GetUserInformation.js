import { useState, useEffect } from 'react';
import axios from "axios";
import AuthService from "../services/auth.service";

// console.log(process.env.REACT_APP_DEV_BASE_URL);
// console.log(process.env.REACT_APP_BASE_PROD_BASE_URL);

// const API_URL = "http://spring-boot-dev.us-east-1.elasticbeanstalk.com/api/";

const GetUserInformation = (length, useridprop) => {

    const currentUser = AuthService.getCurrentUser();
    
    console.log("currentUser");
    console.log(currentUser);


    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(process.env.REACT_APP_DEV_BASE_URL + `user/${useridprop}`, { withCredentials: true })
        .then((response) => {
            console.log("getUser response data");
            console.log(response.data);
            setData(response.data);
            setLoading(false);
        }).catch(error => {
            console.log("error in getuserInformation")
            console.log(error);
            setError(error);
        });
    }, [length]);

    if(error) return `Error: ${error.message}`;
    return [data, loading]

}

export default GetUserInformation;