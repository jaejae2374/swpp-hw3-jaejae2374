import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Article from "../Article";

const mockNavigate = jest.fn();
    jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useNavigate: () => mockNavigate,
}));

describe("<Article />", () => {
    afterEach(() => { jest.clearAllMocks() });
    it("should render without errors", () => {
        render(<Article title={"Article_Title"} id={1} author={"Article_Author"} />);
        const titleButton = screen.getByText("Article_Title");
        screen.getByText("Article_Author");
        screen.getByText("1");
        fireEvent.click(titleButton!);
        waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/articles/1"));
    });
});