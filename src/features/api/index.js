import { SERVER_URL, UNSPLASH_ACCESS_KEY } from "@env";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
});

const unsplashInstance = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
  },
});

async function getProjects(allElements) {
  try {
    const userId = await SecureStore.getItemAsync("user");

    const response = await axiosInstance.get(`api/users/${userId}`);

    return response;
  } catch (err) {
    console.log(err);
  }
}

async function postProjects({ allElements, thumbnail }) {
  try {
    const userId = await SecureStore.getItemAsync("user");
    const projectId = await SecureStore.getItemAsync("projectId");

    const response = await axiosInstance.post(`api/users/${userId}/projects`, {
      allElements,
      thumbnail,
      projectId,
    });

    return response;
  } catch (err) {
    console.log(err);
  }
}

async function getImages() {
  try {
    const response = await unsplashInstance.get("/photos", {
      params: { per_page: 30 },
    });

    return response;
  } catch (err) {
    console.log(err);
  }
}

async function searchImages(query, page = 1, perPage = 30) {
  try {
    const response = await unsplashInstance.get("/search/photos", {
      params: { query, page, perPage },
    });

    return response;
  } catch (err) {
    console.log(err);
  }
}

async function postSignIn(email, password) {
  try {
    const response = await axiosInstance.post("/api/auth/signin", {
      email,
      password,
    });

    if (response.status === 201) {
      await SecureStore.setItemAsync("token", response.data.token);
      await SecureStore.setItemAsync("user", response.data.user._id);
    }

    return response;
  } catch (err) {
    console.log(err);
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

async function getGifs() {
  try {
    const response = await axiosInstance.get("/api/assets/gifs");

    if (response.status === 200) {
      return response.data.gifURLs;
    }
  } catch (err) {
    console.log(err);
  }
}

async function getFonts() {
  try {
    const response = await axiosInstance.get("/api/assets/fonts");

    if (response.status === 200) {
      return response.data.fontURLs;
    }
  } catch (err) {
    console.log(err);
  }
}

async function createGif({ encodedFrames, fps, width, height }) {
  try {
    const response = await axiosInstance.post("/api/files/gif/new", {
      encodedFrames,
      fps,
      width,
      height,
    });

    if (response.status === 200) {
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}

export default {
  postSignUp,
  postSignIn,
  getGifs,
  getImages,
  searchImages,
  getFonts,
  createGif,
  postProjects,
  getProjects,
};
