import axios from "axios";
import { clearStore } from "../feature/user/userSlice";
import { getUserFromLocalStorage } from "./localStorage";

const api = axios.create({
  baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
});

api.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers.common["Authorization"] = `Bearer ${user.token}`;
  }
  return config;
});

export const checkForUnauthorizedResponse = (error, thunkAPi) => {
  if (Number(error.response.status) === 401) {
    thunkAPi.dispatch(clearStore());
    return thunkAPi.rejectWithValue("Unauthorized! Logging Out.");
  }
  return thunkAPi.rejectWithValue(error.response.data.msg);
};

export default api;
