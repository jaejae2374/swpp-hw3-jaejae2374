import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { articleActions } from "../store/slices/article";


function ArticleCreate() {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [author, setAuthor] = useState<number>(1);
    const [mode, setMode] = useState<string>("write");
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleConfirm = () => {
        if (title == "" || content == "") {
            return <button id="confirm-create-article-button" disabled>Confirm</button>
        } else {
            return <button id="confirm-create-article-button" onClick={createArticle}>Confirm</button>
        }
    }
    
    const createArticle = () => {
        const data = { title: title, content: content, author: author };
        dispatch(articleActions.createArticle(data))
        return navigate("/articles") // TODO: detail page 이동
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

    return (
        <div className="ArticleCreate">
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