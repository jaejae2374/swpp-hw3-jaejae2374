import { UserState } from '../store/slices/user';
import { ArticleState } from '../store/slices/article';
import { CommentState } from '../store/slices/comment';
import { getMockStore } from "./mock";

export const createMockStoreLogout = () => {
    const stubUserInitialState: UserState = {
        users: [
          { id: 1, email: "swpp@snu.ac.kr", password: "iluvswpp", name: "Software Lover", logged_in: false },
          { id: 2, email: "alan@turing.com", password: "iluvswpp", name: "Alan Turing", logged_in: false },
        ],
        selectedUser: null,
    };
    const stubArticleInitialState: ArticleState = {
        articles: [
            { id: 1, title: "TEST_TITLE_1", content: "TEST_CONTENT_1", author_id: 1 },
            { id: 2, title: "TEST_TITLE_2", content: "TEST_CONTENT_2", author_id: 2 },
            { id: 3, title: "TEST_TITLE_3", content: "TEST_CONTENT_3", author_id: 3 },
        ],
        selectedArticle: null,
    };
    const stubCommentInitialState: CommentState = {
        comments: [
            { id: 1, content: "TEST_Comment_CONTENT_1", author_id: 1, article_id: 1 },
            { id: 2, content: "TEST_Comment_CONTENT_2", author_id: 2, article_id: 1 },
        ],
        selectedComment: null,
    };
    
    const mockStore = getMockStore({
        comment: stubCommentInitialState,
        article: stubArticleInitialState,
        user: stubUserInitialState,
    });
    return mockStore
}
