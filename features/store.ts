import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice"
import ContentReducer from "./contentSlice"

export const store = configureStore({
    reducer: {
      auth: AuthReducer,
      content: ContentReducer
    }
  });

  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch