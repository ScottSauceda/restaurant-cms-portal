import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
// import Profile from "./components/Profile";
import UserView from "./panels/UserView";
import BoardUser from "./components/BoardUser";
import BoardOwner from "./components/BoardOwner";
import BoardAdmin from "./components/BoardAdmin";

// pre Auth pages
import Signup from "./pages/signup";
// import NewRestaurant from "./pages/newRestaurants";
import UserRestaurants from "./panels/UserRestaurants";
import SingleRestaurant from "./pages/restaurant";
import RestaurantImages from "./pages/restaurantImages";

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";

const App = () => {
  const [showOwnerBoard, setShowOwnerBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    console.log("user");
    console.log(user);

    if (user) {
      setCurrentUser(user);
      setShowOwnerBoard(user.roles.includes("ROLE_OWNER"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowOwnerBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Foodie
        </Link>
        <div className="navbar-nav">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showOwnerBoard && (
            <li className="nav-item">
              <Link to={"/owner"} className="nav-link">
                Owner Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/newRestaurants"} className="nav-link">
                Restaurants
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          {/* <Route exact path="/register" element={<Register />} /> */}
          <Route path="/signup" exact element={<Signup />} />
          {/* <Route exact path="/profile" element={<Profile />} /> */}
          <Route exact path="/profile" element={<UserView />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/owner" element={<BoardOwner/>} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/newRestaurants" exact element={<UserRestaurants/>} />
          <Route path="/restaurant" exact element={<SingleRestaurant/>} />
          <Route path="restaurantImages" exact element={<RestaurantImages />} />
        </Routes>
      </div>

      {/* <AuthVerify logOut={logOut}/> */}
    </div>
  );
};

export default App;