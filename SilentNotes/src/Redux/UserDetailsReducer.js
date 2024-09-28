import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getUserDetails = createAsyncThunk("user/getDetails", async () => {
  const { data } = await axios({
    withCredentials: true,
    url: import.meta.env.VITE_BACKEND + "/user/details",
    method: "GET",
  });
  return data.data;
});

export const logout = createAsyncThunk("user/logout", async () => {
  await axios({
    url: import.meta.env.VITE_BACKEND + "/user/logout",
    withCredentials: true,
  });
});

export const validateOTP = createAsyncThunk("user/validateOTP", async (otp) => {
  const { data } = await axios({
    withCredentials: true,
    url: import.meta.env.VITE_BACKEND + "/otp/validate/" + otp,
    method: "GET",
  });
  return data;
});

const userdetailsSlice = createSlice({
  name: "userdetails",
  initialState: {
    username: "",
    avatar: "",
    id: "",
    collegeName: "",
    collegeDomain: "",
    status: -1, //-1=unauthorized, 1=authorized, 0=authorizing
    verified: false,
  },
  reducers: {
    userDetails: (state, action) => {
      state.username = action.payload.username;
      state.id = action.payload.id;
      state.avatar = action.payload.avatar;
      state.collegeName = action.payload.collegeName;
      state.collegeDomain = action.payload.collegeDomain;
      state.verified = action.payload.verified;
    },
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Reducers for getting userdetails
    builder.addCase(getUserDetails.pending, (state) => {
      state.status = 0;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.id = action.payload.id;
      state.avatar = action.payload.avatar;
      state.collegeName = action.payload.collegeName;
      state.collegeDomain = action.payload.collegeDomain;
      state.verified = action.payload.verified;
      state.status = 1;
    });
    builder.addCase(getUserDetails.rejected, (state) => {
      state.status = -1;
    });

    // rerducers for logging out
    builder.addCase(logout.fulfilled, (state) => {
      state.status = -1;
      state.username = "";
      state.id = "";
      state.avatar = "";
      state.collegeName = "";
      state.collegeDomain = "";
      state.verified = false;
    });

    // Reducers for validating OTPs
    builder.addCase(validateOTP.fulfilled, (state, action) => {
      if (action.payload.isValid) {
        state.verified = true;
        toast.success("OTP validated successfully.");
      } else toast.error("Something went wrong.");
    });
  },
});

export default userdetailsSlice.reducer;

export const { userDetails, changeStatus } = userdetailsSlice.actions;
