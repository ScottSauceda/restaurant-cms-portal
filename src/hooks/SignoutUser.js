import { useState, useEffect } from 'react';
import axios from "axios";

const SignoutUser = () => {

    console.log('SignoutUser called');

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // sessionStorage.clear();
    localStorage.removeItem("user");
    // localStorage.clear();
    // document.cookie = "";
    console.log("document cookie");
    console.log(document.cookie);


    useEffect(() => {
        axios.post("http://localhost:8080/api/auth/signout")
        // axios.post("http://spring-boot-dev.us-east-1.elasticbeanstalk.com/api/auth/signout")
        .then((response) => {
            console.log("getUser response data");
            console.log(response.data);
            setData(response.data);
            setLoading(false);
        

        }).catch(error => {
            console.log(error);
            setError(error);
        });
    });

    if(error) return `Error: ${error.message}`;
    return [data, loading];

}

export default SignoutUser;