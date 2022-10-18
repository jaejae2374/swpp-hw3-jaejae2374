import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkMiddleware } from "redux-thunk";
import reducer, { CommentState, fetchComments, fetchComment, postComment, deleteComment, editComment } from "./comment";

describe("comment reducer", () => {
    let store: EnhancedStore<
        { comment: CommentState },
        AnyAction,
        [ThunkMiddleware<{ comment: CommentState }, AnyAction, undefined>]
    >;
    const fakeComment = {
        id: 1, article_id: 1, content: "test_content", author_id: 1
    };
    const fakeComment_edit = {
        id: 1, article_id: 1, content: "test_content_edit", author_id: 1
    };
    const fakeComment_not_exist = {
        id: 9, article_id: 1, content: "test_content_edit", author_id: 1
    };
    beforeAll(() => {
        store = configureStore(
            { reducer: { comment: reducer } }
        );
    });
    it("should handle initial state", () => {
        expect(reducer(undefined, { type: "unknown" })).toEqual({
            comments: [],
            selectedComment: null,
        });
    });
    it("should handle fetchComments", async () => {
        axios.get = jest.fn().mockResolvedValue({ data: [fakeComment] });
        await store.dispatch(fetchComments());
        expect(store.getState().comment.comments).toEqual([fakeComment]);
    });
    it("should handle fetchComment", async () => {
        axios.get = jest.fn().mockResolvedValue({ data: fakeComment });
        await store.dispatch(fetchComment(1));
        expect(store.getState().comment.selectedComment).toEqual(fakeComment); 
    });
    it("should handle fetchComment null", async () => {
        axios.get = jest.fn().mockResolvedValue({ data: null });
        await store.dispatch(fetchComment(9));
        expect(store.getState().comment.selectedComment).toEqual(null); 
    });
    it("should handle deleteComment", async () => {
        axios.delete = jest.fn().mockResolvedValue({ data: null });
        await store.dispatch(deleteComment(1));
        expect(store.getState().comment.comments).toEqual([]);
    });
    it("should handle postComment", async () => {
        jest.spyOn(axios, "post").mockResolvedValue({
            data: fakeComment,
        });
        await store.dispatch(
          postComment({ id: 1, article_id: 1, content: "test_content", author_id: 1})
        );
        expect(store.getState().comment.comments).toEqual([fakeComment]);
    });
    it("should handle editComment", async () => {
        jest.spyOn(axios, "put").mockResolvedValue({
            data: fakeComment,
        });

        await store.dispatch(
          editComment(fakeComment_edit)
        );
        expect(store.getState().comment.comments).toEqual([fakeComment]);
    });
    it("should handle editComment null", async () => {
        jest.spyOn(axios, "put").mockResolvedValue({
            data: fakeComment_not_exist,
        });

        await store.dispatch(
          editComment(fakeComment_not_exist)
        );
        expect(store.getState().comment.comments).toEqual([fakeComment]);
    });
});