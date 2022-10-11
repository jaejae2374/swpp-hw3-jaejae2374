import { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom'
import Article from './Article'
import { useDispatch, useSelector } from "react-redux";
import { selectArticle, fetchArticles } from "../store/slices/article";
import { userActions, selectUser, fetchUsers } from "../store/slices/user";
import { fetchComments } from '../store/slices/comment';
import { AppDispatch } from '../store';
import Logout from './logout';

function ArticleList() {
    const navigate = useNavigate();
    const articleState = useSelector(selectArticle);
    const dispatch = useDispatch<AppDispatch>();
    const userState = useSelector(selectUser);
    const userId = 1;
    
    useEffect(() => {
      dispatch(fetchArticles());
      dispatch(fetchComments());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const handleLogin = () => {
      const target = userState.users.find((u) => u.id == userId);
      if (! target?.logged_in) {
        return <Navigate to="/login" />;
      }
    }

    const getName = (id: Number) => {
      const target = userState.users.find((u) => u.id == id);
      return target?.name;
    }
  
    return (
      <div>
        {handleLogin()}
        <Logout />
        <h1>Article List</h1>
        <button id='create-article-button' onClick={() => { return navigate("/articles/create") }}> 
            Create Article 
        </button>
        <hr />
        <div className="Articles">
            {articleState.articles.map((a) => {
              return <Article id={a.id} title={a.title} author={getName(a.author_id)} />;
            })} 
        </div>
      </div>
    );
}
 
export default ArticleList;