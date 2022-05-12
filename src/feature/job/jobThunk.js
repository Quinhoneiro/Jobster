import { getAllJobs, hideLoading, showLoading } from "../allJobs/allJobsSlice";
import api, { checkForUnauthorizedResponse } from "../../utils/axios";
import { logoutUser } from "../user/userSlice";
import { clearValues } from "./jobSlice";

export const createJobThunk = async (job, thunkApi) => {
  try {
    const resp = await api.post("/jobs", job);
    thunkApi.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    if (Number(error.response.status) === 401) {
      thunkAPi.dispatch(logoutUser());
      toast.error("Unauthorized! Logging Out.");
    }
    toast.error(error.response.data.msg);
  }
};

export const deleteJobThunk = async (jobId, thunkAPi) => {
  thunkAPi.dispatch(showLoading());
  try {
    const resp = await api.delete(`jobs/${jobId}`);
    thunkAPi.dispatch(getAllJobs());
    return resp.data.msg;
  } catch (error) {
    thunkAPi.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPi);
  }
};

export const editJobThunk = async ({ jobId, job }, thunkAPi) => {
  try {
    console.log("Aqui");
    const resp = await api.patch(`/jobs/${jobId}`, job);
    thunkAPi.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    if (Number(error.response.status) === 401) {
      thunkAPi.dispatch(logoutUser());
      toast.error("Unauthorized! Logging Out.");
    }
    toast.error(error.response.data.msg);
  }
};
