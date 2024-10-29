import AxiosInstance from "@/utils/axios";
import { setToken } from "./TokenService";

interface loginCredentials {
  email: string;
  password: string;
  device_name: string;
}

// solicitud de inicio de sesion "post"
const login = async (credentials: loginCredentials) => {
  const { data, statusText } = await AxiosInstance.post("/login", credentials);
  await setToken(data.token);
  return statusText;
};

// carga los datos del usuario al iniciar sesion "get"
const loadUser = async () => {
  const { data: user } = await AxiosInstance.get("/user");
  console.log("get: ", user);
  return user;
};

// Logout con un post, limpia el token a NULL
const logout = async () => {
  await AxiosInstance.post("/logout", {});
  await setToken(null);
};

export { login, loadUser, logout };
