import { useState, useEffect } from 'react';
import axios from "axios";

const GetUserRestaurants = (length, useridprop) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/restaurant/restaurants/${useridprop}`, { withCredentials: true })
        .then((response) => {
            console.log("getUser response data");
            console.log(response.data);
            setData(response.data);
            setLoading(false);
        })
        .catch(error => { 
            console.log(error)
            setError(error);
        });
    }, [length]);

    return [data, loading]
}

export default GetUserRestaurants;