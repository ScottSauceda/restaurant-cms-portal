import React, { useState, useEffect } from "react";
import UserRestaurants from "../panels/UserRestaurants";

const NewRestaurant = () => {

    useEffect(() => {
        console.log("newRestaurants");
    })

    return (
        <div>
            <div className="container-lg">
                <h1>User Restaurants</h1>
                <UserRestaurants/>
            </div>
        </div>
    )
}

export default NewRestaurant;