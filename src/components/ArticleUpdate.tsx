import { useState, useEffect } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { selectArticle, editArticle, fetchArticle } from "../store/slices/article";
import Article2 from './Article2'
import { selectUser } from "../store/slices/user";
import { AppDispatch } from '../store';
import Logout from './logout';


function ArticleUpdate() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const articleId = Number(useParams().id);
    const articleState = useSelector(selectArticle);
    const userState = useSelector(selectUser);
    const userId = 1;

    useEffect(() => {
        dispatch(fetchArticle(articleId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let titleInit = "";
    let contentInit = "";

    if (articleState.selectedArticle) {
        titleInit = articleState.selectedArticle.title;
        contentInit =  articleState.selectedArticle.content;
    }

    const [title, setTitle] = useState<string>(titleInit);
    const [content, setContent] = useState<string>(contentInit);
    const [mode, setMode] = useState<string>("write");


    const handleConfirm = () => {
        if (title == "" || content == "") {
            return <button id="confirm-edit-article-button" disabled>Confirm</button>
        } else {
            return <button id="confirm-edit-article-button" onClick={updateArticle}>Confirm</button>
        }
    }
    
    const updateArticle = () => {
        const data = { title: title, content: content, author_id: userId, id: articleId };
        dispatch(editArticle(data));
        return navigate(`/articles/${articleId}`);
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
                    <Article2 author={userId} title={title} content={content} />
                </div>
            );
        }
    }

    const handleBack = () => {
        let conf = true;
        if (title !== titleInit || content !== contentInit) {
            conf = window.confirm("Are you sure? The change will be lost.");
        }
        if (conf) {
            return navigate("/articles");
        }
    }
    const handleLogin = () => {
        const target = userState.users.find((u) => u.id == userId);
        if (! target?.logged_in) {
          return <Navigate to="/login" />;
        }
      }

    return (
        <div className="ArticleUpdate">
            {handleLogin()}
            <Logout />
            <h1>Article Edit</h1>
            <button id="preview-tab-button" onClick={(event) => setMode("preview")}>Preview</button>
            <button id="write-tab-button" onClick={(event) => setMode("write")}>Write</button>
            {handleMode()}
            <button id="back-edit-article-button" onClick={handleBack}>Back</button>
            {handleConfirm()}
        </div>
    )
}

export default ArticleUpdate;