import axios from "axios";


// console.log(process.env.REACT_APP_DEV_BASE_URL);
// console.log(process.env.REACT_APP_BASE_PROD_BASE_URL);

// const API_URL = "http://spring-boot-dev.us-east-1.elasticbeanstalk.com/api/";

const getPublicContent = () => {
  return axios.get(process.env.REACT_APP_DEV_BASE_URL + "test/all");
};

const getOwnerBoard = () => {
  return axios.get(process.env.REACT_APP_DEV_BASE_URL + "test/owner", { withCredentials: true });
};

// const getUserBoard = () => {
//   return axios.get(process.env.REACT_APP_DEV_BASE_URL + "test/user");
// };


const getAdminBoard = () => {
  return axios.get(process.env.REACT_APP_DEV_BASE_URL + "test/admin");
};

const UserService = {
  getPublicContent,
  getOwnerBoard,
  getAdminBoard,
}

export default UserService;
