import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { articleActions, selectArticle, postArticle } from "../store/slices/article";
import Article2 from './Article2'
import { AppDispatch } from '../store';
import { selectUser } from "../store/slices/user";
import Logout from './logout';


function ArticleCreate() {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [author, setAuthor] = useState<number>(1);
    const [mode, setMode] = useState<string>("write");
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const articleState = useSelector(selectArticle);
    const userState = useSelector(selectUser);

    const handleConfirm = () => {
        if (title == "" || content == "") {
            return <button id="confirm-create-article-button" disabled>Confirm</button>
        } else {
            return <button id="confirm-create-article-button" onClick={createArticle}>Confirm</button>
        }
    }
    
    const createArticle = () => {
        const articleId = articleState.articles[articleState.articles.length - 1].id + 1;
        const data = { id: articleId, title: title, content: content, author_id: author };
        dispatch(postArticle(data));
        return navigate(`/articles/${articleId}`)
    }

    const handleMode = () => {
        if (mode == "write") {
            return (
                <div>
                    <label>Title</label>
                    <input id="article-title-input" type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
                    <label>Content</label>
                    <textarea id="article-content-input" rows={6} cols={50} value={content} onChange={(event) => setContent(event.target.value)} />
                </div>
            );
        } else {
            return (
                <div>
                    <Article2 author={author} title={title} content={content} />
                </div>
            );
        }
    }

    const handleLogin = () => {
        const target = userState.users.find((u) => u.id == 1);
        if (! target?.logged_in) {
          return <Navigate to="/login" />;
        }
        return <></>
    }

    return (
        <div className="ArticleCreate">
            <Logout />
            {handleLogin()}
            <h1>Article Create</h1>
            <button id="preview-tab-button" onClick={(event) => setMode("preview")}>Preview</button>
            <button id="write-tab-button" onClick={(event) => setMode("write")}>Write</button>
            {handleMode()}
            <button id="back-create-article-button" onClick={(event) => navigate("/articles")}>Back</button>
            {handleConfirm()}
        </div>
    )
}

export default ArticleCreate;