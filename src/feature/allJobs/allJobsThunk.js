import api, { checkForUnauthorizedResponse } from "../../utils/axios";

export const getAllJobsThunk = async (_, thunkAPi) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkAPi.getState().allJobs;

  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;

  if (search) {
    url = url + `&search=${search}`;
  }

  try {
    const resp = await api.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPi);
  }
};

export const showStatsThunk = async (_, thunkAPi) => {
  try {
    const resp = await api.get("/jobs/stats");
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPi);
  }
};
