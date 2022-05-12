import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../utils/axios";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import {
  clearStoreThunk,
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
} from "./userThunk";

const initialState = {
  isLoading: false,
  isSideBarOpen: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPi) => {
    return registerUserThunk("/auth/register", user, thunkAPi);
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPi) => {
    return loginUserThunk("/auth/login", user, thunkAPi);
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPi) => {
    return updateUserThunk("/auth/updateUser", user, thunkAPi);
  }
);

export const clearStore = createAsyncThunk("user/clearStore", clearStoreThunk);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSideBarOpen = false;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(`Logout Successfully!`);
      }
    },
    toggleSideBar: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      const user = action.payload.user;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Hello there ${user.name}!`);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      const user = action.payload.user;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Welcome Back ${user.name}!`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      const user = action.payload.user;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`User Updated Successfully`);
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [clearStore.rejected]: () => {
      state.isLoading = false;
      toast.error("There was an error!");
    },
  },
});
export const { toggleSideBar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
