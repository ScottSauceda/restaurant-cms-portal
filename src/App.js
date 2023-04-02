import React, {  useState, useEffect } from "react";
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages';
// import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Logout from "./pages/logout";
import Profile from "./pages/profile";
// import Restaurant from "./pages/restaurants";
import Signup from "./pages/signup";
import NewRestaurant from "./pages/newRestaurants";
import SingleRestaurant from "./pages/restaurant";
import RestaurantImages from "./pages/restaurantImages";

const App = () => {



  return (
    <Router>
      {/* <Navbar/> */}
      <Routes>
        <Route exact path="/" element={<Login />} />
        {/* <Route path="/dashboard" exact element={<Dashboard />} /> */}
        <Route path="/login" exact element={<Login />} />
        <Route path="/logout" exact element={<Logout />} />
        <Route path="/profile" exact element={<Profile />} />
        {/* <Route path="/restaurants" exact element={<Restaurant />} /> */}
        <Route path="/newRestaurants" exact element={<NewRestaurant/>} />
        <Route path="/restaurant" exact element={<SingleRestaurant/>} />
        <Route path="restaurantImages" exact element={<RestaurantImages />} />
        <Route path="/signup" exact element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
