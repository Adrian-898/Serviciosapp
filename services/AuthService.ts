import AxiosInstance from "@/utils/axios";
import { setToken } from "./TokenService";

interface loginCredentials {
  email: string;
  password: string;
  device_name: string;
}

interface registerCredentials {
  email: string;
  password: string;
  confirmPassword: string;
  device_name: string;
}

// solicitud de registro "post"
const register = async (credentials: registerCredentials) => {
  const { data, statusText } = await AxiosInstance.post(
    "/register",
    credentials
  );
  await setToken(data.token);
  return statusText;
};

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

// envia un link para resetear la contraseña
const sendPasswordResetLink = async (email: string) => {
  const { data, statusText } = await AxiosInstance.post("/forgot-password", {
    email,
  });
  console.log(data);
  return { data, statusText };
};

export { register, login, loadUser, logout, sendPasswordResetLink };
