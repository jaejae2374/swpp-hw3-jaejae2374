import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import axios from 'axios'

export interface CommentType { id: number; article_id: number; content: string; author_id: number; }
export interface CommentState { comments: CommentType[]; selectedComment: CommentType | null;}

const initialState: CommentState = {
    comments: [
    ],
    selectedComment: null,
};

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        deleteComment: (state, action: PayloadAction<{ targetId: number }>) => {
            const deleted = state.comments.filter((c) => {
                return c.id !== action.payload.targetId;
            });
            state.comments = deleted;
        },
        createComment: (state, action: PayloadAction<{ id: number, article_id: number, content: string, author_id: number }>) => {
            const newComment = {
                id: action.payload.id,
                article_id: action.payload.article_id,
                content: action.payload.content,
                author_id: action.payload.author_id
            };
            state.comments.push(newComment);
        },
        updateComment: (state, action: PayloadAction<{ id: number, content: string }>) => {
            const target = state.comments.find((c) => c.id === action.payload.id);
            if (target) {
                target.content = action.payload.content;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.comments = action.payload
        });
        builder.addCase(fetchComment.fulfilled, (state, action) => {
            state.selectedComment = action.payload;
        });
    }
});

export const commentActions = commentSlice.actions;
export const selectComment = (state: RootState) => state.comment;
export default commentSlice.reducer;

export const fetchComments = createAsyncThunk(
    "comment/fetchComments",
    async () => {
        const response = await axios.get<CommentType[]>("/api/comments/");
        return response.data;
    }
);

export const postComment = createAsyncThunk(
    "comment/postComment",
    async (c: Pick<CommentType, "id" | "article_id" | "content" | "author_id">, { dispatch }) => {
        const response = await axios.post("/api/comments/", c);
        dispatch(commentActions.createComment(response.data));
    }
);

export const deleteComment = createAsyncThunk(
    "comment/deleteComment",
    async (id: CommentType["id"], { dispatch }) => {
        await axios.delete(`/api/comments/${id}/`);
        dispatch(commentActions.deleteComment({ targetId: id }));
    }
);

export const editComment = createAsyncThunk(
    "comment/updateComment",
    async (c: Pick<CommentType, "id" | "content" >, { dispatch }) => {
        const response = await axios.put(`/api/comments/${c.id}/`, c);
        dispatch(commentActions.updateComment(response.data));
    }
);

export const fetchComment = createAsyncThunk( 
    "comment/fetchComment",
    async (id: CommentType["id"], { dispatch }) => {
        const response = await axios.get(`/api/comments/${id}/`);
        return response.data ?? null;
    }
);
