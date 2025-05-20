import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:5001/api", // Backend adresin bu olacak
});

export default API;
