import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  otpVerification,
  login,
  checkAuth,
  logoutUser,
} from "./userThunk";

const initialState = {
  user: null,
  email: "",
  otpExpiration: null,
  canVerifyOtp: false,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  authChecked: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.email = action.payload.data.email;
        state.otpExpiration = action.payload.data.otpExpiration;
        state.canVerifyOtp = true;
      })

      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //otpVerification
      .addCase(otpVerification.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(otpVerification.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.canVerifyOtp = false;
      })
      .addCase(otpVerification.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data; // store logged in user data
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ── checkAuth on app boot ────────────────────────
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authChecked = true;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.authChecked = true; // we tried — result is "not logged in"
        state.isAuthenticated = false;
        state.user = null;
      })
      // ── LOGOUT ──
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        // keep authChecked: true — we know the state now
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // Still clear local state — the user wanted out.
        // Even if the server call failed, drop local session.
        state.user = null;
        state.isAuthenticated = false;
      });
      
  },
});

export const { logout } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
