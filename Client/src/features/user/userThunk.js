import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axiosInstance"

export const register = createAsyncThunk(
    "register", async (userData, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/user/register", userData);

            return response.data;


        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response.data.message || " Registration Failed"
            )
        }

    }

);

export const otpVerification = createAsyncThunk(
    "otpVerification", async (otpVerificationData, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/user/otp-verification",otpVerificationData);
            return response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed otp Verification"
            )
        }
    }
);

export const login = createAsyncThunk(
    "login", async (loginData, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/user/login", loginData);
            console.log("response login is:"+response)
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response.data.message || "Login failed"
            )
        }
    }
)