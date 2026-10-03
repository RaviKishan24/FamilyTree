import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axiosInstance";

// Create a family (send the whole nested tree)
export const createFamily = createAsyncThunk(
  "family/create",
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/family/create", payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create family",
      );
    }
  },
);

// Fetch all families for the logged-in user
export const fetchFamilies = createAsyncThunk(
  "family/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/family/families");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load families",
      );
    }
  },
);

export const fetchFamilyById = createAsyncThunk(
  "family/fetchOne",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/family/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load family",
      );
    }
  },
);
