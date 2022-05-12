import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./feature/user/userSlice";
import jobReducer from "./feature/job/jobSlice";
import allJobsReducer from "./feature/allJobs/allJobsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    job: jobReducer,
    allJobs: allJobsReducer,
  },
});
