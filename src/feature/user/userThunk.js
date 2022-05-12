import api, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearAllJobsState } from "../allJobs/allJobsSlice";
import { clearValues } from "../job/jobSlice";
import { logoutUser } from "./userSlice";

export const registerUserThunk = async (url, user, thunkAPi) => {
  try {
    const resp = await api.post(url, user);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPi);
  }
};

export const loginUserThunk = async (url, user, thunkAPi) => {
  try {
    const resp = await api.post(url, user);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPi);
  }
};

export const updateUserThunk = async (url, user, thunkAPi) => {
  try {
    const resp = await api.patch(url, user);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPi);
  }
};

export const clearStoreThunk = async (message, thunkAPi) => {
  try {
    thunkAPi.dispatch(logoutUser(message));
    thunkAPi.dispatch(clearAllJobsState());
    thunkAPi.dispatch(clearValues());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
