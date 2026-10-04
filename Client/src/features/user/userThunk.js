import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axiosInstance";

// ─────────────────────────────────────────────
// REGISTER
// ─────────────────────────────────────────────
export const register = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/user/register", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Registration failed"
      );
    }
  }
);

// ─────────────────────────────────────────────
// OTP VERIFICATION
// ─────────────────────────────────────────────
export const otpVerification = createAsyncThunk(
  "user/otpVerification",
  async (otpVerificationData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/user/otp-verification",
        otpVerificationData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "OTP verification failed"
      );
    }
  }
);

// ─────────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────────
export const login = createAsyncThunk(
  "user/login",
  async (loginData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/user/login", loginData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Login failed"
      );
    }
  }
);

// ─────────────────────────────────────────────
// CHECK AUTH
// ─────────────────────────────────────────────
export const checkAuth = createAsyncThunk(
  "user/checkAuth",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/check-auth");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Not authenticated"
      );
    }
  }
);

// ─────────────────────────────────────────────
// LOGOUT
// ─────────────────────────────────────────────
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/user/logout");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Logout failed"
      );
    }
  }
);