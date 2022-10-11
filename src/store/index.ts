import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./slices/article";
import userReducer from "./slices/user";
import commentReducer from "./slices/comment"


export const store = configureStore({
 reducer: {
   article: articleReducer,
   user: userReducer,
   comment: commentReducer
 },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;