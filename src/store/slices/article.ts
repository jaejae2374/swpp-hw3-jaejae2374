import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface ArticleType { id: number; title: string; content: string; author: number; }
export interface ArticleState { articles: ArticleType[]; selectedArticle: ArticleType | null;}
const initialState: ArticleState = {
 articles: [
   { id: 1, title: "SWPP", content: "take swpp class", author: 1 },
   { id: 2, title: "Movie", content: "watch movie", author: 1},
   { id: 3, title: "Dinner", content: "eat dinner", author: 1},
 ],
 selectedArticle: null,
};
export const articleSlice = createSlice({
    name: "article",
    initialState,
    reducers: {
        getAll: (state, action: PayloadAction<{ todos: ArticleType[] }>) => {},
        getArticle: (state, action: PayloadAction<{ targetId: number }>) => {
            const target = state.articles.find((a) => a.id === action.payload.targetId);
            state.selectedArticle = target ?? null
        },
        deleteArticle: (state, action: PayloadAction<{ targetId: number }>) => {
            const deleted = state.articles.filter((a) => {
                return a.id !== action.payload.targetId;
            });
            state.articles = deleted;
        },
        createArticle: (state, action: PayloadAction<{ title: string; content: string; author: number }>) => {
            const newArticle = {
                id: state.articles[state.articles.length - 1].id + 1, // temporary
                title: action.payload.title,
                content: action.payload.content,
                author: action.payload.author
            };
            state.articles.push(newArticle);
        },
        updateArticle: (state, action: PayloadAction<{ title: string; content: string; author: number; targetId: number }>) => {
            const target = state.articles.find((a) => a.id === action.payload.targetId);
            if (target) {
                target.title = action.payload.title;
            }
        },
   }, });
export const articleActions = articleSlice.actions;
export const selectArticle = (state: RootState) => state.article;
export default articleSlice.reducer;

