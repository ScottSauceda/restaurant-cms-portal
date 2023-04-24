import axios from "axios";

// console.log(process.env.REACT_APP_DEV_BASE_URL);
// console.log(process.env.REACT_APP_BASE_PROD_BASE_URL);


// const API_URL = "http://spring-boot-dev.us-east-1.elasticbeanstalk.com/api/auth/";

const register = (username, email, password) => {
  return axios.post(process.env.REACT_APP_DEV_BASE_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {

  console.log("signing in user")

  return axios
    .post(process.env.REACT_APP_DEV_BASE_URL + "auth/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        console.log("setting user to localStorage")
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(process.env.REACT_APP_DEV_BASE_URL + "auth/signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;
