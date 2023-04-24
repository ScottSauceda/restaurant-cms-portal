import { useState, useEffect } from 'react';
import axios from "axios";

// console.log(process.env.REACT_APP_DEV_BASE_URL);
// console.log(process.env.REACT_APP_BASE_PROD_BASE_URL);


// const API_URL = "http://spring-boot-dev.us-east-1.elasticbeanstalk.com/api/";

const GetUserRestaurants = (length, useridprop) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(process.env.REACT_APP_DEV_BASE_URL + `restaurant/restaurants/${useridprop}`, { withCredentials: true })
        .then((response) => {
            console.log("getUser response data");
            console.log(response.data);
            setData(response.data);
            setLoading(false);
        })
        .catch(error => { 
            console.log("An error occured")
            console.log(error)
            setError(error);
        });
    }, [length]);

    return [data, loading]
}

export default GetUserRestaurants;