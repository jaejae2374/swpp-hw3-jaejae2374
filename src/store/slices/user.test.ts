import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkMiddleware } from "redux-thunk";
import reducer, { UserState, fetchUsers, fetchUser, updateLogin } from "./user";

describe("user reducer", () => {
    let store: EnhancedStore<
        { user: UserState },
        AnyAction,
        [ThunkMiddleware<{ user: UserState }, AnyAction, undefined>]
    >;
    const fakeUser = {
        id: 1, email: "swpp@snu.ac.kr", password: "iluvswpp", name: "Software Lover", logged_in: false
    };
    const fakeUser_login = {
        id: 1, email: "swpp@snu.ac.kr", password: "iluvswpp", name: "Software Lover", logged_in: true
    };
    beforeAll(() => {
        store = configureStore(
            { reducer: { user: reducer } }
        );
    });
    beforeEach(() => {
        jest.clearAllMocks();
    })
    it("should handle initial state", () => {
        expect(reducer(undefined, { type: "unknown" })).toEqual({
            users: [],
            selectedUser: null,
        });
    });
    it("should handle fetchUsers", async () => {
        axios.get = jest.fn().mockResolvedValue({ data: [fakeUser] });
        await store.dispatch(fetchUsers());
        expect(store.getState().user.users).toEqual([fakeUser]);
    });
    it("should handle fetchUser", async () => {
        axios.get = jest.fn().mockResolvedValue({ data: fakeUser });
        await store.dispatch(fetchUser(1));
        expect(store.getState().user.selectedUser).toEqual(fakeUser); 
    });
    it("should handle fetchUser null", async () => {
        axios.get = jest.fn().mockResolvedValue({ data: null });
        await store.dispatch(fetchUser(9));
        expect(store.getState().user.selectedUser).toEqual(null); 
    });
    it("should handle updateLogin", async () => { 
        jest.spyOn(axios, "put").mockResolvedValue({
            data: fakeUser_login,
        });

        await store.dispatch(
          updateLogin(fakeUser_login)
        );
        expect(store.getState().user.users).toEqual([fakeUser]);
    });
});