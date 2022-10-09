import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { selectArticle, articleActions } from "../store/slices/article";


function ArticleUpdate() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const articleId = Number(useParams().id);
    const articleState = useSelector(selectArticle);
    let titleInit = "";
    let contentInit = "";
    if (articleState.selectedArticle) {
        titleInit = articleState.selectedArticle.title;
        contentInit =  articleState.selectedArticle.content;
    }
    const [title, setTitle] = useState<string>(titleInit);
    const [content, setContent] = useState<string>(contentInit);
    const [author, setAuthor] = useState<number>(1);
    const [mode, setMode] = useState<string>("write");
    


    const handleConfirm = () => {
        if (title == "" || content == "") {
            return <button id="confirm-edit-article-button" disabled>Confirm</button>
        } else {
            return <button id="confirm-edit-article-button" onClick={updateArticle}>Confirm</button>
        }
    }
    
    const updateArticle = () => {
        const data = { title: title, content: content, author: author, targetId: articleId };
        dispatch(articleActions.updateArticle(data));
        return navigate("/articles"); // TODO: detail page 이동
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
                    <h2>Preview Mode</h2>
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
        } else {
            return
        }
    }

    return (
        <div className="ArticleUpdate">
            <h1>Article Update</h1>
            <button id="preview-tab-button" onClick={(event) => setMode("preview")}>Preview</button>
            <button id="write-tab-button" onClick={(event) => setMode("write")}>Write</button>
            {handleMode()}
            <button id="back-edit-article-button" onClick={handleBack}>Back</button>
            {handleConfirm()}

        </div>
    )

}

export default ArticleUpdate;