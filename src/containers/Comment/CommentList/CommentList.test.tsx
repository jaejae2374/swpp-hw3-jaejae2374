import { createMockStoreLogin} from '../../../test-utils/mock_state2'
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes, Navigate } from "react-router";
import { render, screen } from "@testing-library/react";
import ArticleDetail from "../../../containers/Article/ArticleDetail/ArticleDetail"

const mockStore = createMockStoreLogin();
describe("<CommentList />", () => {
    let commentList: JSX.Element;
    let commentList_another: JSX.Element;
    beforeEach(() => {
        jest.clearAllMocks();
        commentList = (
            <Provider store={mockStore}>
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Navigate to={"/articles/1"}/>}/>
                    <Route path="/articles/:id" element={<ArticleDetail />} />
                </Routes>
            </MemoryRouter>
            </Provider>
        );
        commentList_another = (
            <Provider store={mockStore}>
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Navigate to={"/articles/2"}/>}/>
                    <Route path="/articles/:id" element={<ArticleDetail />} />
                </Routes>
            </MemoryRouter>
            </Provider>
        );
    });
    it("should render CommentList", () => {
        const { container } = render(commentList);
        expect(container).toBeTruthy();
    });
    it("should render comment lists", () => {
        render(commentList);
        screen.getByText("TEST_Comment_CONTENT_1");
        screen.getByText("TEST_Comment_CONTENT_2");
        screen.getByText("Alan Turing");
    });
    it("should not show comment lists in other article.", () => {
        render(commentList_another);
        expect(screen.queryByText("TEST_Comment_CONTENT_1")).toBeNull();
        expect(screen.queryByText("TEST_Comment_CONTENT_2")).toBeNull();
    });
});