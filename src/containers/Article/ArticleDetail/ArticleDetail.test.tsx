import { createMockStoreLogin} from '../../../test-utils/mock_state2'
import { createMockStoreLogout} from '../../../test-utils/mock_state'
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes, Navigate } from "react-router";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "../../../components/User/login";
import ArticleDetail from "../../../containers/Article/ArticleDetail/ArticleDetail"
import ArticleList from "../../../containers/Article/ArticleList/ArticleList"
import ArticleEdit from "../../../containers/Article/ArticleUpdate/ArticleUpdate"

interface IProps {
    title: string | undefined;
    content: string | undefined;
    author: string | undefined;
}
const mockNavigate = jest.fn();
    jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useNavigate: () => mockNavigate,
}));
const mockDispatch = jest.fn();
    jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockDispatch,
}));
const mockStore = createMockStoreLogin();
const mockStore_logout = createMockStoreLogout();
describe("<ArticleDetail />", () => {
    let articleDetail: JSX.Element;
    let articleDetail_logout: JSX.Element;
    beforeEach(() => {
        jest.clearAllMocks();
        articleDetail = (
            <Provider store={mockStore}>
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Navigate to={"/articles/1"}/>}/>
                    <Route path="/articles/:id" element={<ArticleDetail />} />
                    <Route path="/articles" element={<ArticleList />} />
                    <Route path="/articles/:id/edit" element={<ArticleEdit />} />
                </Routes>
            </MemoryRouter>
            </Provider>
        );
        articleDetail_logout = (
            <Provider store={mockStore_logout}>
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Navigate to={"/articles/1"}/>}/>
                    <Route path="/articles/:id" element={<ArticleDetail />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </MemoryRouter>
            </Provider>
        );
    });
    it("should render ArticleDetail", () => {
        const { container } = render(articleDetail);
        expect(container).toBeTruthy();
    });
    it("should render detailed article", () => {
        render(articleDetail);
        screen.getByText("Logout");
        screen.getByText("Article Detail");
        screen.getByText("TEST_TITLE_1");
        screen.getByText("TEST_CONTENT_1");
    });
    it("should navigate to article list page", () => {
        render(articleDetail);
        const backButton = screen.getByText("Back");
        fireEvent.click(backButton);
        waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/articles"));
    });
    it("should navigate to article edit page", () => {
        render(articleDetail);
        const editButton = screen.getAllByText("Edit")[0];
        fireEvent.click(editButton);
        waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/articles/1/edit"));
    });
    it("should delete article", () => {
        render(articleDetail);
        const deleteButton = screen.getAllByText("Delete")[0];
        fireEvent.click(deleteButton);
        waitFor(() => expect(mockDispatch).toHaveBeenCalledTimes(1));
    });
    it("should navigate to login page when logout", () => {
        render(articleDetail_logout);
        waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/login"));
    });

});