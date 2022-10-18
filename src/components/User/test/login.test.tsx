import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "../login";
import ArticleList from "../../../containers/Article/ArticleList/ArticleList"
import { createMockStoreLogout } from '../../../test-utils/mock_state'
import { createMockStoreLogin } from '../../../test-utils/mock_state2'
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";

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
const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

describe("<Login />", () => {
    let login: JSX.Element;
    let login_already: JSX.Element;
    beforeEach(() => { 
        const mockStore = createMockStoreLogout();
        const mockStore_login = createMockStoreLogin();
        login = (
            <Provider store={mockStore}>
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/articles" element={<ArticleList />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
        login_already = (
            <Provider store={mockStore_login}>
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/articles" element={<ArticleList />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
     });
    afterEach(() => { jest.clearAllMocks(); });
    it("should render without errors", () => {
        render(login);
        screen.getByLabelText('Email');
        screen.getByLabelText("PW");
        expect(screen.getAllByText("Login")).toHaveLength(2);
    });
    it("should be logined if email, pw correct.", () => {
        render(login);
        const emailInput = screen.getByLabelText('Email');
        const pwInput = screen.getByLabelText("PW");
        fireEvent.change(emailInput, {target: {value: 'swpp@snu.ac.kr'}});
        fireEvent.change(pwInput, {target: {value: 'iluvswpp'}});
        const loginButton = screen.getByRole("button", {name: "Login"});
        fireEvent.click(loginButton);
        waitFor(() => expect(mockDispatch).toHaveBeenCalled());
        waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/articles"));
    });
    it("should not be logined if email, pw wrong.", () => {
        render(login);
        const emailInput = screen.getByLabelText('Email');
        const pwInput = screen.getByLabelText("PW");
        fireEvent.input(emailInput, "swpp@snu.ac.cr");
        fireEvent.input(pwInput, "iluvswpp");
        const loginButton = screen.getByRole("button", {name: "Login"});
        fireEvent.click(loginButton);
        expect(mockAlert).toHaveBeenCalled();
    });
    it("should change input value if email, pw input.", () => {
        render(login);
        const emailInput = screen.getByLabelText('Email');
        const pwInput = screen.getByLabelText("PW");
        fireEvent.change(emailInput, {target: {value: 'swpp'}});
        fireEvent.change(pwInput, {target: {value: 'iluv'}});
        screen.getByDisplayValue("swpp");
        screen.getByDisplayValue("iluv");
    });
    it("should navigate to /articles if already login.", () => {
        render(login_already);
        waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/articles"));
    });
});