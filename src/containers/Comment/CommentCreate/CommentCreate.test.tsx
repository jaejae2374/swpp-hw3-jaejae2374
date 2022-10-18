import { createMockStoreLogin} from '../../../test-utils/mock_state2'
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes, Navigate } from "react-router";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ArticleDetail from "../../../containers/Article/ArticleDetail/ArticleDetail"

const mockDispatch = jest.fn();
    jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockDispatch,
}));
const mockStore = createMockStoreLogin();
describe("<CommentCreate />", () => {
    let commentCreate: JSX.Element;
    beforeEach(() => {
        jest.clearAllMocks();
        commentCreate = (
            <Provider store={mockStore}>
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Navigate to={"/articles/1"}/>}/>
                    <Route path="/articles/:id" element={<ArticleDetail />} />
                </Routes>
            </MemoryRouter>
            </Provider>
        );
    });
    it("should render CommentCreate", () => {
        const { container } = render(commentCreate);
        expect(container).toBeTruthy();
    });
    it("should render comment create section", () => {
        render(commentCreate);
        screen.getByLabelText("Comment Create");
    });
    it("should create comment", () => {
        render(commentCreate);
        const commentInput = screen.getByLabelText("Comment Create");
        const confirmButton = screen.getByText("Confirm");
        expect(confirmButton).toBeDisabled();
        fireEvent.change(commentInput, {target: {value: 'test_comment'}});
        screen.getByDisplayValue("test_comment");
        fireEvent.click(confirmButton);
        waitFor(() => expect(mockDispatch).toHaveBeenCalled());
    });
});