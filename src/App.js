import React, {  useState, useEffect } from "react";
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages';
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Logout from "./pages/logout";
import Restaurant from "./pages/restaurants";
import Signup from "./pages/signup";

const App = () => {



  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/logout" exact element={<Logout />} />
        <Route path="/restaurants" exact element={<Restaurant />} />
        <Route path="/signup" exact element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
