import { useState, useEffect } from 'react';
import axios from "axios";

const GetUserRestaurants = (length, useridprop) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(
            `http://localhost:8080/restaurant/restaurants/${useridprop}`, // pass this as a variable
            {
                method: "GET",
                headers: new Headers({})
            }
        )
        .then(res => res.json())
        .then(response => {
            setData(response);
            setLoading(false);
            console.log(response)
        })
        .catch(error => { 
            console.log(error)
            setError(error);
        });
    }, [length]);

    return [data, loading]
}

export default GetUserRestaurants;