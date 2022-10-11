import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { selectArticle, fetchArticles } from "../store/slices/article";
import { userActions, selectUser, fetchUsers } from "../store/slices/user";
import {selectComment, fetchComments} from '../store/slices/comment'
import axios from 'axios'
import { AppDispatch } from '../store'
import Comment from './Comment'
import CommentCreate from './CommentCreate'

interface IProps {
    article_id: number,
    author_id: number
}

function CommentList(props: IProps) {
    const commentState = useSelector(selectComment);
    const dispatch = useDispatch<AppDispatch>();
    const userState = useSelector(selectUser);
    
    // useEffect(() => {
    //   dispatch(fetchComments());
    //   // dispatch(fetchUsers());
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    
    // const handleLogin = () => {
    //   const target = userState.users.find((u) => u.id == 1);
    //   if (! target?.logged_in) {
    //     return <Navigate to="/login" />;
    //   }
    //   return <h2></h2>
    // }

    const getName = (id: Number) => {
      const target = userState.users.find((u) => u.id == id);
      return target?.name;
    }
  
    return (
      <div>
        <h1>Comment List</h1>
        {/* <button id='create-article-button' style={{ padding: '7px 10px', fontWeight: 'bold' }} onClick={() => { return navigate("/articles/create") }}> 
            Create Article 
        </button> */}
        <hr />
        <div className="Comments">
            <CommentCreate article_id={props.article_id} author_id={props.author_id}/>
            {commentState.comments.map((c) => {
                if (c.article_id == props.article_id) {
                    return <Comment id={c.id} content={c.content} author={getName(c.author_id)} author_id={c.author_id} />;
                } 
            })} 
        </div>
      </div>
    );
}
 
export default CommentList;