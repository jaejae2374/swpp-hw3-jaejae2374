import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import axios from 'axios'

export interface UserType { id: number; email: string; password: string; name: string; logged_in: boolean}
export interface UserState { users: UserType[]; selectedUser: UserType | null;}

const initialState: UserState = {
    users: [
    ],
    selectedUser: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateLogin: (state, action: PayloadAction<{ id: number, email: string, password: string, name: string, logged_in: boolean }>) => {
            let target = state.users.find((u) => u.id === action.payload.id);
            target = {
                id: action.payload.id,
                email: action.payload.email,
                password: action.payload.password,
                name: action.payload.name,
                logged_in: action.payload.logged_in
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.selectedUser = action.payload;
        });
    }
});

export const userActions = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;

export const fetchUsers = createAsyncThunk(
    "user/fetchUsers",
    async () => {
        const response = await axios.get<UserType[]>("/api/user/");
        return response.data;
    }
);

export const fetchUser = createAsyncThunk( 
    "user/fetchUser",
    async (id: UserType["id"], { dispatch }) => {
        const response = await axios.get(`/api/user/${id}/`);
        return response.data ?? null;
    }
);

export const updateLogin = createAsyncThunk(
    "user/updateLogin",
    async (u: Pick<UserType, "id" | "email" | "password" | "logged_in" | "name">, { dispatch }) => {
        const response = await axios.put(`/api/user/${u.id}/`, u);
        dispatch(userActions.updateLogin(u));
    }
);