import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", /* CONSUMIR DADOS DO JSON SERVER */ 
  // baseURL: "http://localhost:8080", /* CONSUMIR DADOS DO BACKEND SPRINGBOOT */
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;