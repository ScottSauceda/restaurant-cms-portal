import { useState, useEffect } from 'react';
import axios from "axios";
import AuthService from "../services/auth.service";

const GetUserInformation = (length, useridprop) => {

    const currentUser = AuthService.getCurrentUser();
    
    console.log("currentUser");
    console.log(currentUser);


    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // axios.get(`http://localhost:8080/api/user/${useridprop}`, { withCredentials: true })
        axios.get(`http://spring-boot-dev.us-east-1.elasticbeanstalk.com/api/user/${useridprop}`, { withCredentials: true })
        .then((response) => {
            console.log("getUser response data");
            console.log(response.data);
            setData(response.data);
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setError(error);
        });
    }, [length]);

    if(error) return `Error: ${error.message}`;
    return [data, loading]

}

export default GetUserInformation;