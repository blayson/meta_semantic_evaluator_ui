import axios from "axios";
import { API_URL } from "@/helpers/constants";

const http = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;
