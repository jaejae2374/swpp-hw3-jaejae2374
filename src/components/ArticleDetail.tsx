import { useState, useEffect } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { selectArticle, articleActions, deleteArticle, fetchArticle } from "../store/slices/article";
import Article2 from './Article2'
import { AppDispatch } from '../store';
import { selectUser } from "../store/slices/user";
import Logout from './logout';
import CommentList from './CommentList'


function ArticleDetail() {
    const navigate = useNavigate();
    const articleId = Number(useParams().id);
    const dispatch = useDispatch<AppDispatch>();
    const articleState = useSelector(selectArticle);
    const userState = useSelector(selectUser);

    useEffect(() => {
        dispatch(fetchArticle(articleId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [articleId]);

    const handleEdit = () => {
        if (articleState.selectedArticle?.author_id === 1) {
            return (
                <button id='edit-article-button' style={{ padding: '7px 10px', fontWeight: 'bold' }} onClick={() => { return navigate(`/articles/${articleId}/edit`); }}> 
                    Edit
                </button>
            );
        }
        return <></>
    }
    const handleDelete = () => {
        if (articleState.selectedArticle?.author_id === 1) {
            return (
                <button id='delete-article-button' style={{ padding: '7px 10px', fontWeight: 'bold' }} onClick={
                    () => { 
                        dispatch(deleteArticle(articleId)); 
                        return navigate(`/articles`); }}> 
                    Delete
                </button>
            );
        }
        return <></>
    }

    const handleLogin = () => {
        const target = userState.users.find((u) => u.id == 1);
        if (! target?.logged_in) {
          return <Navigate to="/login" />;
        }
        return <></>
    }

    // TODO: Comment 호출 모듈
    return (
        <div className="Article">
            <Logout />
            {handleLogin()}
            <Article2 
                author={articleState.selectedArticle?.author_id} 
                title={articleState.selectedArticle?.title} 
                content={articleState.selectedArticle?.content} />
            {handleEdit()}
            {handleDelete()}
            <button id='back-detail-article-button' style={{ padding: '7px 10px', fontWeight: 'bold' }} onClick={() => { return navigate("/articles") }}> 
                Back
            </button>
            <CommentList article_id={articleId} author_id={1} />
        </div>
    );
}
export default ArticleDetail;