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
  // const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    console.log("user");
    console.log(user);

    if (user) {
      setCurrentUser(user);
      setShowOwnerBoard(user.roles.includes("ROLE_OWNER"));
      // setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
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
    
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        


        {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul>
          <li className="nav-item">
            <Link to={"/restaurant-cms-portal/home"} className="nav-link navFont">
              Home
            </Link>
          </li> */}

          {/* {showOwnerBoard && (
            <li className="nav-item">
              <Link to={"/restaurant-cms-portal/owner"} className="nav-link navFont">
                Owner Board
              </Link>
            </li>
          )} */}

          {/* {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/restaurant-cms-portal/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )} */}

          {/* {currentUser && (
            <li className="nav-item">
              <Link to={"/restaurant-cms-portal/owner"} className="nav-link">
                Owner
              </Link>
            </li>
          )} */}

        {currentUser ? (
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
            <Link to={"/restaurant-cms-portal/"} className="nav-link navFont">
              Foodie
            </Link>
            </li>
            <li className="nav-item">
              <Link to={"/restaurant-cms-portal/home"} className="nav-link navFont">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/restaurant-cms-portal/profile"} className="nav-link navFont">
                {/* {currentUser.username} */}
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/restaurant-cms-portal/newRestaurants"} className="nav-link navFont">
                Restaurants
              </Link>
            </li>
            <li className="nav-item">
              <a href="/restaurant-cms-portal/home" className="nav-link navFont" onClick={logOut}>
                LogOut
              </a>
            </li>
            </ul>
          </div>
        ) : (
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/restaurant-cms-portal/"} className="nav-link navFont">
              Foodie
            </Link>
            </li>
          <li className="nav-item">
            <Link to={"/restaurant-cms-portal/home"} className="nav-link navFont">
              Home
            </Link>
          </li>
            <li className="nav-item">
              <Link to={"/restaurant-cms-portal/login"} className="nav-link navFont">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/restaurant-cms-portal/signup"} className="nav-link navFont">
                Sign Up
              </Link>
            </li>
            </ul>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          {/* <Route exact path={"/restaurant-cms-portal/"} element={<Home />} /> */}
          <Route path={"/restaurant-cms-portal/home"} element={<Home />} />
          <Route path="/restaurant-cms-portal/login" element={<Login />} />
          {/* <Route exact path="/register" element={<Register />} /> */}
          <Route path="/restaurant-cms-portal/signup" exact element={<Signup />} />
          {/* <Route exact path="/profile" element={<Profile />} /> */}
          <Route path="/restaurant-cms-portal/profile" element={<UserView />} />
          <Route path="/restaurant-cms-portal/user" element={<BoardUser />} />
          <Route path="/restaurant-cms-portal/owner" element={<BoardOwner/>} />
          <Route path="/restaurant-cms-portal/admin" element={<BoardAdmin />} />
          <Route path="/restaurant-cms-portal/newRestaurants" exact element={<UserRestaurants/>} />
          <Route path="/restaurant-cms-portal/restaurant" exact element={<SingleRestaurant/>} />
          <Route path="/restaurant-cms-portal/restaurantImages" exact element={<RestaurantImages />} />
        </Routes>
      </div>

      {/* <AuthVerify logOut={logOut}/> */}
    </div>
  );
};

export default App;