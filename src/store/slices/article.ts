import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import axios from 'axios'

export interface ArticleType { id: number; title: string; content: string; author_id: number; }
export interface ArticleState { articles: ArticleType[]; selectedArticle: ArticleType | null;}

const initialState: ArticleState = {
    articles: [
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
        createArticle: (state, action: PayloadAction<{ id: number, title: string, content: string, author_id: number }>) => {
            const newArticle = {
                id: action.payload.id,
                title: action.payload.title,
                content: action.payload.content,
                author_id: action.payload.author_id
            };
            state.articles.push(newArticle);
        },
        updateArticle: (state, action: PayloadAction<{ title: string, content: string, author_id: number, id: number }>) => {
            const target = state.articles.find((a) => a.id === action.payload.id);
            if (target) {
                target.title = action.payload.title;
                target.content = action.payload.content;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchArticles.fulfilled, (state, action) => {
            state.articles = action.payload
        });
        builder.addCase(fetchArticle.fulfilled, (state, action) => {
            state.selectedArticle = action.payload;
        });
    }
});

export const articleActions = articleSlice.actions;
export const selectArticle = (state: RootState) => state.article;
export default articleSlice.reducer;

export const fetchArticles = createAsyncThunk(
    "article/fetchArticles",
    async () => {
        const response = await axios.get<ArticleType[]>("/api/articles/");
        return response.data;
    }
);

export const postArticle = createAsyncThunk(
    "article/postArticle",
    async (a: Pick<ArticleType, "id" | "title" | "content" | "author_id">, { dispatch }) => {
        const response = await axios.post("/api/articles/", a);
        dispatch(articleActions.createArticle(response.data));
    }
);

export const deleteArticle = createAsyncThunk(
    "article/deleteArticle",
    async (id: ArticleType["id"], { dispatch }) => {
        await axios.delete(`/api/articles/${id}/`);
        dispatch(articleActions.deleteArticle({ targetId: id }));
    }
);

export const editArticle = createAsyncThunk(
    "article/updateArticle",
    async (a: Pick<ArticleType, "id" | "title" | "content" | "author_id">, { dispatch }) => {
        const response = await axios.put(`/api/articles/${a.id}/`, a);
        dispatch(articleActions.updateArticle(response.data));
    }
);

export const fetchArticle = createAsyncThunk( 
    "article/fetchArticle",
    async (id: ArticleType["id"], { dispatch }) => {
        const response = await axios.get(`/api/articles/${id}/`);
        return response.data ?? null;
    }
);
