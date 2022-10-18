import { fireEvent, render, screen } from "@testing-library/react";
import Logout from "../logout";

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

describe("<Logout />", () => {
    afterEach(() => { jest.clearAllMocks(); });
    it("should render without errors", () => {
        render(<Logout />);
        const logoutButton = screen.getByText("Logout");
        fireEvent.click(logoutButton);
        expect(mockDispatch).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalled();
    });
    
});