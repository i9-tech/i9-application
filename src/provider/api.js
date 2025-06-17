import axios from "axios";
import { enviroments } from "../utils/enviroments";

const api = axios.create({
  baseURL: enviroments.apiURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
