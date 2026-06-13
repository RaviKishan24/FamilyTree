import { createSlice } from "@reduxjs/toolkit";
import { register, otpVerification, login } from "./userThunk"
import { useNavigate } from "react-router-dom";

const initialState = {
    user: null,
    email: "" ,
    otpExpiration: null ,
    canVerifyOtp: false,
    isAuthenticated: false,
    isLoading: false,
    error: null

}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            //register
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = null;
                state.email=action.payload.data.email;
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
            });

    }
})

export const { logout } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;