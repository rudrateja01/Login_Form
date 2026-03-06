import axios from "axios";

const API = axios.create({
  baseURL: "https://login-form-wjvu.onrender.com/api",
  withCredentials: true, 
});

export default API;
