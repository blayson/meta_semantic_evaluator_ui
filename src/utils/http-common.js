import axios from "axios";
import { API_URL } from "@/utils/constants";

const http = axios.create({
  baseURL: API_URL,
});

export { http };
