import { useEffect } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { selectArticle, deleteArticle, fetchArticle } from "../../../store/slices/article";
import Article2 from '../../../components/Article/Article2'
import { AppDispatch } from '../../../store';
import { selectUser } from "../../../store/slices/user";
import Logout from '../../../components/User/logout';
import CommentList from '../../Comment/CommentList/CommentList'


function ArticleDetail() {
    const navigate = useNavigate();
    const articleId = Number(useParams().id);
    const dispatch = useDispatch<AppDispatch>();
    const articleState = useSelector(selectArticle);
    const userState = useSelector(selectUser);
    const userId = 1;

    useEffect(() => {
        dispatch(fetchArticle(articleId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [articleId]);

    const getName = (id: Number | undefined) => {
        if (id) {
            const target = userState.users.find((u) => u.id == id);
            return target?.name;
        }
    }

    const handleEdit = () => {
        if (articleState.selectedArticle?.author_id === userId) {
            return (
                <button id='edit-article-button' onClick={() => { return navigate(`/articles/${articleId}/edit`); }}> 
                    Edit
                </button>
            );
        }
    }
    const handleDelete = () => {
        if (articleState.selectedArticle?.author_id === userId) {
            return (
                <button id='delete-article-button' onClick={
                    () => { 
                        dispatch(deleteArticle(articleId)); 
                        return navigate(`/articles`); }}> 
                    Delete
                </button>
            );
        }
    }

    const handleLogin = () => {
        const target = userState.users.find((u) => u.id == userId);
        if (! target?.logged_in) {
          return <Navigate to="/login" />;
        }
    }
    
    return (
        <div className="Article">
            <Logout />
            {handleLogin()}
            <h1>Article Detail</h1>
            <Article2 
                author={getName(articleState.selectedArticle?.author_id)} 
                title={articleState.selectedArticle?.title} 
                content={articleState.selectedArticle?.content} />
            {handleEdit()}
            {handleDelete()}
            <button id='back-detail-article-button' onClick={() => { return navigate("/articles") }}> 
                Back
            </button>
            <CommentList article_id={articleId} author_id={userId} />
        </div>
    );
}
export default ArticleDetail;