import { createMockStoreLogin} from '../../../test-utils/mock_state2'
import { createMockStoreLogout} from '../../../test-utils/mock_state'
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "../../../components/User/login";
import ArticleList from "../../../containers/Article/ArticleList/ArticleList"

interface IProps {
    title: string;
    id: number;
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
jest.mock("../../../components/Article/Article", () => (props: IProps) => (
    <div data-testid="spyArticle">
        <div className="a_id">
            {props.id}
        </div>
        <button className="a_title" onClick={() => { return mockNavigate(`/articles/${props.id}`) }}>
            {props.title}
        </button>
        <div className="a_author">
            {props.author}
        </div>
    </div>
));
const mockStore = createMockStoreLogin();
const mockStore_logout = createMockStoreLogout();
describe("<ArticleList />", () => {
    let articleList: JSX.Element;
    let articleList_logout: JSX.Element;
    beforeEach(() => {
        jest.clearAllMocks();
        articleList = (
            <Provider store={mockStore}>
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<ArticleList />} />
                </Routes>
            </MemoryRouter>
            </Provider>
        );
        articleList_logout = (
            <Provider store={mockStore_logout}>
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<ArticleList />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </MemoryRouter>
            </Provider>
        );
    });
    it("should render ArticleList", () => {
        const { container } = render(articleList);
        expect(container).toBeTruthy();
    });
    it("should render articles", () => {
        render(articleList);
        screen.getByText("Create Article");
        screen.getByText("Logout");
        const articles = screen.getAllByTestId("spyArticle");
        expect(articles).toHaveLength(3);
    });
    it("should navigate to article create page", () => {
        render(articleList);
        const createButton = screen.getByText("Create Article");
        fireEvent.click(createButton);
        waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/articles/create"));
    });
    it("should navigate to login page when logout", () => {
        render(articleList_logout);
        waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/login"));
    });

});