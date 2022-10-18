import { createMockStoreLogin} from '../../../test-utils/mock_state2'
import { createMockStoreLogout} from '../../../test-utils/mock_state'
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes, Navigate } from "react-router";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "../../../components/User/login";
import ArticleCreate from "../../../containers/Article/ArticleCreate/ArticleCreate"
import ArticleDetail from "../../../containers/Article/ArticleDetail/ArticleDetail"
import ArticleList from "../../../containers/Article/ArticleList/ArticleList"

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
describe("<ArticleCreate />", () => {
    let articleCreate: JSX.Element;
    let articleCreate_logout: JSX.Element;
    let articleDetail_another: JSX.Element;
    beforeEach(() => {
        jest.clearAllMocks();
        articleCreate = (
            <Provider store={mockStore}>
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Navigate replace to={"/articles/create"}/>}/>
                    <Route path="/articles/create" element={<ArticleCreate />} />
                    <Route path="/articles" element={<ArticleList />} />
                    <Route path="/articles/:id" element={<ArticleDetail />} />
                </Routes>
            </MemoryRouter>
            </Provider>
        );
        articleCreate_logout = (
            <Provider store={mockStore_logout}>
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Navigate replace to={"/articles/create"}/>}/>
                    <Route path="/articles/create" element={<ArticleCreate />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </MemoryRouter>
            </Provider>
        );
        articleDetail_another = (
            <Provider store={mockStore}>
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Navigate replace to={"/articles/2"}/>}/>
                    <Route path="/articles/:id" element={<ArticleDetail />} />
                </Routes>
            </MemoryRouter>
            </Provider>
        );
    });
    it("should render ArticleCreate", () => {
        const { container } = render(articleCreate);
        expect(container).toBeTruthy();
    });
    it("should render article create page", () => {
        render(articleCreate);
        screen.getByText("Logout");
        screen.getByText("Article Create");
        screen.getByLabelText('Title');
        screen.getByLabelText("Content");
    });
    it("should navigate to article list page", () => {
        render(articleCreate);
        const backButton = screen.getByText("Back");
        fireEvent.click(backButton);
        waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/articles"));
    });
    it("should create article.", () => {
        render(articleCreate);
        const titleInput = screen.getByLabelText('Title');
        const contentInput = screen.getByLabelText("Content");
        const confirmButton = screen.getByText("Confirm");
        fireEvent.change(titleInput, {target: {value: 'test_title'}});
        fireEvent.change(contentInput, {target: {value: 'test_content'}});
        screen.getByDisplayValue("test_title");
        screen.getByDisplayValue("test_content");
        fireEvent.click(confirmButton);
        waitFor(() => expect(mockDispatch).toHaveBeenCalledTimes(1));
        waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/articles/:id"));
    });
    it("should disable confirm button.", () => {
        render(articleCreate);
        const titleInput = screen.getByLabelText('Title');
        const contentInput = screen.getByLabelText("Content");
        const confirmButton = screen.getByText("Confirm");
        expect(confirmButton).toBeDisabled();
        fireEvent.change(titleInput, {target: {value: 'test_title'}});
        expect(confirmButton).toBeDisabled();
        fireEvent.change(titleInput, {target: {value: ''}});
        fireEvent.change(contentInput, {target: {value: 'test_content'}});
        expect(confirmButton).toBeDisabled();
    });
    it("should show preview, write mode", () => {
        render(articleCreate);
        const previewButton = screen.getByText("Preview");
        const titleInput = screen.getByLabelText('Title');
        const contentInput = screen.getByLabelText("Content");
        fireEvent.change(titleInput, {target: {value: 'test_title'}});
        fireEvent.change(contentInput, {target: {value: 'test_content'}});
        fireEvent.click(previewButton);
        screen.getByText("test_title");
        screen.getByText("test_content");
        const writeButton = screen.getByText("Write");
        fireEvent.click(writeButton);
        screen.getByLabelText('Title');
        screen.getByLabelText("Content");
    });
    it("should navigate to login page when logout", () => {
        render(articleCreate_logout);
        waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/login"));
    });

});