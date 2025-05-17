import axios from "axios";

const api = axios.create({
  // baseURL: "https://i9-server-djgeexgnhsbmbkc6.eastus-01.azurewebsites.net/", /* CONSUMIR DADOS DA AZURE */ 
  baseURL: "http://localhost:3000/", /* CONSUMIR DADOS DO JSON SERVER */ 
  // baseURL: "http://localhost:8080", /* CONSUMIR DADOS DO BACKEND SPRINGBOOT */
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;