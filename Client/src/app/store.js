import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import familyReducer from "../features/family/familySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    family: familyReducer,
  },
});
