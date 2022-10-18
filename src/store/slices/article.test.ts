import { AnyAction, configureStore, EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkMiddleware } from "redux-thunk";
import reducer, { ArticleState, fetchArticles, fetchArticle, postArticle, deleteArticle, editArticle } from "./article";
describe("article reducer", () => {
    let store: EnhancedStore<
        { article: ArticleState },
        AnyAction,
        [ThunkMiddleware<{ article: ArticleState }, AnyAction, undefined>]
    >;
    const fakeArticle = {
        id: 1, title: "test_title", content: "test_content", author_id: 1
    };
    const fakeArticle_edit = {
        id: 1, title: "test_title_edit", content: "test_content_edit", author_id: 1
    };
    const fakeArticle_not_exist = {
        id: 9, title: "test_title_edit", content: "test_content_edit", author_id: 1
    };
    beforeAll(() => {
        store = configureStore(
            { reducer: { article: reducer } }
        );
    });
    it("should handle initial state", () => {
        expect(reducer(undefined, { type: "unknown" })).toEqual({
            articles: [],
            selectedArticle: null,
        });
    });
    it("should handle fetchArticles", async () => {
        axios.get = jest.fn().mockResolvedValue({ data: [fakeArticle] });
        await store.dispatch(fetchArticles());
        expect(store.getState().article.articles).toEqual([fakeArticle]);
    });
    it("should handle fetchArticle", async () => {
        axios.get = jest.fn().mockResolvedValue({ data: fakeArticle });
        await store.dispatch(fetchArticle(1));
        expect(store.getState().article.selectedArticle).toEqual(fakeArticle); 
    });
    it("should handle fetchArticle null", async () => {
        axios.get = jest.fn().mockResolvedValue({ data: null });
        await store.dispatch(fetchArticle(9));
        expect(store.getState().article.selectedArticle).toEqual(null); 
    });
    it("should handle deleteArticle", async () => {
        axios.delete = jest.fn().mockResolvedValue({ data: null });
        await store.dispatch(deleteArticle(1));
        expect(store.getState().article.articles).toEqual([]);
    });
    it("should handle postArticle", async () => {
        jest.spyOn(axios, "post").mockResolvedValue({
            data: fakeArticle,
        });
        await store.dispatch(
          postArticle({ id: 1, title: "test_title", content: "test_content", author_id: 1})
        );
        expect(store.getState().article.articles).toEqual([fakeArticle]);
    });
    it("should handle editArticle", async () => {
        jest.spyOn(axios, "put").mockResolvedValue({
            data: fakeArticle,
        });

        await store.dispatch(
          editArticle(fakeArticle_edit)
        );
        expect(store.getState().article.articles).toEqual([fakeArticle]);
    });
    it("should handle editArticle null", async () => {
        jest.spyOn(axios, "put").mockResolvedValue({
            data: fakeArticle_not_exist,
        });

        await store.dispatch(
          editArticle(fakeArticle_not_exist)
        );
        expect(store.getState().article.articles).toEqual([fakeArticle]);
    });
});