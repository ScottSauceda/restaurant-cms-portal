import { useState, useEffect } from 'react';

const GetUserLocations = (length) => {
    const[data, setdata] = useState(null);
    const[loading, setLoading] = useState(null);

    useEffect(() => {
        fetch(
            `http://localhost:8080/location/locations/2`, // pass this as a variable
            {
                method: "GET",
                headers: new Headers({})
            }
        )
            .then(res => res.json())
            .then(response => {
                setdata(response);
                setLoading(false);
                console.log("response from location axios");
                console.log(response);
            })
            .catch(error => console.log(error));
    }, [length]);

    return [data, loading]

}

export default GetUserLocations;