import * as SecureStore from "expo-secure-store";

let token: string | null = null;

const setToken = async (newToken: string | null) => {
  token = newToken;

  try {
    if (token !== null) {
      await SecureStore.setItemAsync("token", token);
    } else {
      await SecureStore.deleteItemAsync("token");
    }
  } catch (error) {
    throw error;
  }
};

const getToken = async () => {
  try {
    if (token !== null) {
      return token;
    }
    token = await SecureStore.getItemAsync("token");
    return token;
  } catch (error) {
    throw error;
  }
};

export { getToken, setToken };
