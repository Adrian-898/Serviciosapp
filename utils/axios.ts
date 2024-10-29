import axios from "axios";
import { getToken } from "@/services/TokenService";

const AxiosInstance = axios.create({
  baseURL: "https://api/",
  headers: {
    Accept: "application/json",
  },
});

axios.interceptors.request.use(async (req) => {
  const token = await getToken();

  if (token !== null) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }
  return req;
});

export default AxiosInstance;
