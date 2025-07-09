// frontend/src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getAutosPorTipo = (tipo) => API.get(`/autos?tipo=${tipo}`);
