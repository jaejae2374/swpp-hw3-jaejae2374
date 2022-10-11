import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from '../store';
import { postComment, selectComment } from "../store/slices/comment";

interface IProps {
    article_id: number;
    author_id: number;
}
function CommentCreate(props: IProps) {
    const [content, setContent] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();
    const commentState = useSelector(selectComment);

    const handleConfirm = () => {
        if (content == "") {
            return <button id="confirm-create-article-button" disabled>Confirm</button>
        } else {
            return <button id="confirm-create-article-button" onClick={createComment}>Confirm</button>
        }
    }
    
    const createComment = () => {
        const commentId = commentState.comments[commentState.comments.length - 1].id + 1;
        const data = { id: commentId, content: content, author_id: props.author_id, article_id: props.article_id  };
        dispatch(postComment(data));
        setContent("");
    }

    return (
        <div className="CommentCreate">
            <h1>Comment Create</h1>
            <input id="new-comment-content-input" type="text" value={content} onChange={(event) => setContent(event.target.value)} />
            {handleConfirm()}
        </div>
    )
}

export default CommentCreate;