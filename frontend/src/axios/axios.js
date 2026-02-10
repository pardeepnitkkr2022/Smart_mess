// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://smart-mess-backend-one.vercel.app/api", // Your backend base URL
  withCredentials: true, // Important for sending cookies
});

export default instance;
