import { useState, useEffect } from 'react';
import axios from "axios";

const GetUserRestaurants = (length) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(
            `http://localhost:8080/restaurant/restaurants/2`, // pass this as a variable
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
        .catch(error => console.log(error));
    }, [length]);

    return [data, loading]
}

export default GetUserRestaurants;