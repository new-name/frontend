import { SERVER_URL } from "@env";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
});

async function postSignIn(email, password) {
  try {
    const response = await axiosInstance.post("/api/auth/signin", {
      email,
      password,
    });

    if (response.status === 201) {
      await SecureStore.setItemAsync("token", response.data.token);
    }

    return response;
  } catch (err) {
    const error = err.response.status;

    if (error === 400) {
      Alert.alert("Failed login");
    }

    if (error === 500) {
      Alert.alert("Internal Server Error");
    }
  }
}

async function postSignUp(name, email, password) {
  try {
    const response = await axiosInstance.post("/api/auth/signup", {
      name,
      email,
      password,
    });

    return response;
  } catch (err) {
    console.log(err);
  }
}

export default {
  postSignUp,
  postSignIn,
};
