import AxiosInstance from "@/utils/axios";
import { setToken } from "./TokenService";

type loginCredentials = {
  email: string;
  password: string;
  device_name: string;
};

type registerCredentials = {
  email: string;
  password: string;
  confirmPassword: string;
  device_name: string;
};

// solicitud de registro "post"
const register = async (credentials: registerCredentials) => {
  try {
    const { data, statusText } = await AxiosInstance.post(
      "/register",
      credentials
    );
    await setToken(data.token);
    return statusText;
  } catch (error) {
    throw error;
  }
};

// solicitud de inicio de sesion "post"
const login = async (credentials: loginCredentials) => {
  try {
    const { data, statusText } = await AxiosInstance.post(
      "/login",
      credentials
    );
    await setToken(data.token);
    return statusText;
  } catch (error) {
    throw error;
  }
};

// carga los datos del usuario al iniciar sesion "get"
const loadUser = async () => {
  try {
    const { data: user } = await AxiosInstance.get("/user");
    console.log("get: ", user);
    return user;
  } catch (error) {
    throw error;
  }
};

// Logout con un post, limpia el token a NULL
const logout = async () => {
  try {
    await AxiosInstance.post("/logout", {});
    await setToken(null);
  } catch (error) {
    throw error;
  }
};

// envia un link para resetear la contraseña
const sendPasswordResetLink = async (email: string) => {
  try {
    const { data, statusText } = await AxiosInstance.post("/forgot-password", {
      email,
    });
    console.log(data);
    return { data, statusText };
  } catch (error) {
    throw error;
  }
};

export { register, login, loadUser, logout, sendPasswordResetLink };
