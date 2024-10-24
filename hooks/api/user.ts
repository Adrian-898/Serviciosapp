import axios from "axios";

// login retorna promise
const loginUser = async (email, password) => {
  const response = await axios.post("https//: ", { email, password });
  return response.data;
};

// register retorna promise
const registerUser = async (email, password) => {
  const response = await axios.post("https//: ", { email, password });
  return response.data;
};

export { loginUser, registerUser };
