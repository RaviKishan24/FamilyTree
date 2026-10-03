import { createSlice } from "@reduxjs/toolkit";
import { createFamily, fetchFamilies, fetchFamilyById } from "./familyThunk";

const initialState = {
  families: [], // list of all families for current user
  currentFamily: null, // one family, for the tree view page
  isLoading: false,
  error: null,
  lastCreated: null, // convenience: last successfully created family
};

const familySlice = createSlice({
  name: "family",
  initialState,
  reducers: {
    clearFamilyError: (state) => {
      state.error = null;
    },
    clearCurrentFamily: (state) => {
      state.currentFamily = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ── CREATE ──
      .addCase(createFamily.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createFamily.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.lastCreated = action.payload.family;
        // Optional: prepend to list so it shows up immediately
        state.families.unshift(action.payload.family);
      })
      .addCase(createFamily.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ── FETCH ALL ──
      .addCase(fetchFamilies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFamilies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.families = action.payload.families || [];
      })
      .addCase(fetchFamilies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ── FETCH ONE ──
      .addCase(fetchFamilyById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFamilyById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.currentFamily = action.payload.family;
      })
      .addCase(fetchFamilyById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFamilyError, clearCurrentFamily } = familySlice.actions;
export default familySlice.reducer;
