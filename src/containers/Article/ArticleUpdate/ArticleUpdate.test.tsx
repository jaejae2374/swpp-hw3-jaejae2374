import { createMockStoreLogin} from '../../../test-utils/mock_state2'
import { createMockStoreLogout} from '../../../test-utils/mock_state'
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes, Navigate } from "react-router";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "../../../components/User/login";
import ArticleDetail from "../../../containers/Article/ArticleDetail/ArticleDetail"
import ArticleList from "../../../containers/Article/ArticleList/ArticleList"
import ArticleEdit from "../../../containers/Article/ArticleUpdate/ArticleUpdate"

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
describe("<ArticleEdit />", () => {
    let articleEdit: JSX.Element;
    let articleEdit_logout: JSX.Element;
    beforeEach(() => {
        jest.clearAllMocks();
        articleEdit = (
            <Provider store={mockStore}>
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Navigate replace to={"/articles/1/edit"}/>}/>
                    <Route path="/articles" element={<ArticleList />} />
                    <Route path="/articles/:id" element={<ArticleDetail />} />
                    <Route path="/articles/:id/edit" element={<ArticleEdit />} />
                </Routes>
            </MemoryRouter>
            </Provider>
        );
        articleEdit_logout = (
            <Provider store={mockStore_logout}>
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Navigate replace to={"/articles/1/edit"}/>}/>
                    <Route path="/articles/:id/edit" element={<ArticleEdit />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </MemoryRouter>
            </Provider>
        );
    });
    it("should render ArticleEdit", () => {
        const { container } = render(articleEdit);
        expect(container).toBeTruthy();
    });
    it("should render article edit page", () => {
        render(articleEdit);
        screen.getByText("Logout");
        screen.getByText("Article Edit");
        screen.getByLabelText('Title');
        screen.getByLabelText("Content");
        screen.getByDisplayValue("TEST_TITLE_1");
        screen.getByDisplayValue("TEST_CONTENT_1");
    });
    it("should navigate to article list page without confirm", () => {
        render(articleEdit);
        const backButton = screen.getByText("Back");
        fireEvent.click(backButton);
        waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/articles"));
    });
    it("should navigate to article list page with confirm true", () => {
        render(articleEdit);
        const titleInput = screen.getByLabelText('Title');
        const contentInput = screen.getByLabelText("Content");
        fireEvent.change(titleInput, {target: {value: 'test_title_edit'}});
        fireEvent.change(contentInput, {target: {value: 'test_content_edit'}});
        window.confirm = jest.fn().mockReturnValue(true);
        const backButton = screen.getByText("Back");
        fireEvent.click(backButton);
        waitFor(() => expect(window.confirm).toHaveBeenCalled());
        waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/articles"));
    });
    it("should stay with confirm false", () => {
        render(articleEdit);
        const titleInput = screen.getByLabelText('Title');
        const contentInput = screen.getByLabelText("Content");
        fireEvent.change(titleInput, {target: {value: 'test_title_edit'}});
        fireEvent.change(contentInput, {target: {value: 'test_content_edit'}});
        window.confirm = jest.fn().mockReturnValue(false);
        const backButton = screen.getByText("Back");
        fireEvent.click(backButton);
        waitFor(() => expect(window.confirm).toHaveBeenCalled());
        waitFor(() => expect(mockNavigate).not.toHaveBeenCalledWith("/articles"));
    });
    it("should edit article.", () => {
        render(articleEdit);
        const titleInput = screen.getByLabelText('Title');
        const contentInput = screen.getByLabelText("Content");
        const confirmButton = screen.getByText("Confirm");
        fireEvent.change(titleInput, {target: {value: 'test_title_edit'}});
        fireEvent.change(contentInput, {target: {value: 'test_content_edit'}});
        screen.getByDisplayValue("test_title_edit");
        screen.getByDisplayValue("test_content_edit");
        fireEvent.click(confirmButton);
        waitFor(() => expect(mockDispatch).toHaveBeenCalledTimes(1));
        waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/articles/:id"));
    });
    it("should disable confirm button.", () => {
        render(articleEdit);
        const titleInput = screen.getByLabelText('Title');
        const contentInput = screen.getByLabelText("Content");
        const confirmButton = screen.getByText("Confirm");
        fireEvent.change(titleInput, {target: {value: ''}});
        expect(confirmButton).toBeDisabled();
        fireEvent.change(titleInput, {target: {value: 'test_title_edit'}});
        fireEvent.change(contentInput, {target: {value: ''}});
        expect(confirmButton).toBeDisabled();
    });
    it("should show preview, write mode", () => {
        render(articleEdit);
        const previewButton = screen.getByText("Preview");
        const titleInput = screen.getByLabelText('Title');
        const contentInput = screen.getByLabelText("Content");
        fireEvent.change(titleInput, {target: {value: 'test_title_edit'}});
        fireEvent.change(contentInput, {target: {value: 'test_content_edit'}});
        fireEvent.click(previewButton);
        screen.getByText("test_title_edit");
        screen.getByText("test_content_edit");
        const writeButton = screen.getByText("Write");
        fireEvent.click(writeButton);
        screen.getByLabelText('Title');
        screen.getByLabelText("Content");
    });
    it("should navigate to login page when logout", () => {
        render(articleEdit_logout);
        waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/login"));
    });

});