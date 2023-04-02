import React, { useState, useEffect } from "react";
import UserRestaurants from "../panels/UserRestaurants";
import NavbarLoggedIn from "../components/NavbarLoggedIn";

const NewRestaurant = () => {

    useEffect(() => {
        console.log("newRestaurants");
    })

    return (
        <div>
            <NavbarLoggedIn />
            <div className="container-lg">
                <h1>User Restaurants</h1>
                <UserRestaurants/>
            </div>
        </div>
    )
}

export default NewRestaurant;