import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Comment from "../Comment";

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

describe("<Comment />", () => {
    afterEach(() => { jest.clearAllMocks() });
    it("should render without errors", () => {
        render(<Comment content={"Comment_Title"} id={1} author_id={1} author={"Comment_Author"} />);
        screen.getByText("Comment_Title");
        screen.getByText("Comment_Author");
    });
    it("should show edit and delete Button when user is author.", () => {
        render(<Comment content={"Comment_Title"} id={1} author_id={1} author={"Comment_Author"} />);
        screen.getByText("Edit");
        screen.getByText("Delete");
    });
    it("should not show edit and delete Button when user is not author.", () => {
        render(<Comment content={"Comment_Title"} id={1} author_id={2} author={"Comment_Author"} />);
        expect(screen.queryByText("Edit")).toBeNull();
        expect(screen.queryByText("Delete")).toBeNull();
    });
    
    it("should handle clickDelete.", () => {
        render(<Comment content={"Comment_Title"} id={1} author_id={1} author={"Comment_Author"} />);
        const deleteButton = screen.getByText("Delete");
        fireEvent.click(deleteButton!);
        expect(mockDispatch).toHaveBeenCalled();
    });
    it("should handle clickEdit.", () => {
        render(<Comment content={"Comment_Title"} id={1} author_id={1} author={"Comment_Author"} />);
        window.prompt = jest.fn().mockReturnValue("edit comment");
        const editButton = screen.getByText("Edit");
        fireEvent.click(editButton!);
        waitFor(() => expect(window.prompt).toHaveBeenCalledWith("Edit Comment"));
        expect(mockDispatch).toHaveBeenCalled();
    });
    it("should handle clickEdit canceled.", () => {
        render(<Comment content={"Comment_Title"} id={1} author_id={1} author={"Comment_Author"} />);
        window.prompt = jest.fn().mockReturnValue(false);
        const editButton = screen.getByText("Edit");
        fireEvent.click(editButton!);
        waitFor(() => expect(window.prompt).toHaveBeenCalledWith("Edit Comment"));
        expect(mockDispatch).not.toHaveBeenCalled();
    });
});