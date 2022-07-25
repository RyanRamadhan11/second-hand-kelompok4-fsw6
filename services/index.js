import axios from "axios";
import { baseURL } from "../baseUrl";

const API = axios.create({
  baseURL: baseURL,
});

export default API;