import * as SecureStore from "expo-secure-store";

let token = null;

const setToken = async (newToken) => {
  token = newToken;

  if (token !== null) {
    await SecureStore.setItemAsync("token", token);
  } else {
    await SecureStore.deleteItemAsync("token");
  }
};

const getToken = async () => {
  if (token !== null) {
    return token;
  }
  token = await SecureStore.getItemAsync("token");
  return token;
};

export { getToken, setToken };
