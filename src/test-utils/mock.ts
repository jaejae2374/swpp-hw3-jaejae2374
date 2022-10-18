import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import { RootState } from "../store";
import articleReducer from "../store/slices/article";
import userReducer from "../store/slices/user";
import commentReducer from "../store/slices/comment";

export const getMockStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer: { 
            article: articleReducer,
            user: userReducer,
            comment: commentReducer 
        },
        preloadedState,
    });
};