import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import ownerReducer from "./ownerProperty";
import paymentReducer from "./paymentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    owner: ownerReducer,
    payment: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
