import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/user";
import {selectComment} from '../store/slices/comment'
import Comment from './Comment'
import CommentCreate from './CommentCreate'

interface IProps {
    article_id: number,
    author_id: number
}

function CommentList(props: IProps) {
    const commentState = useSelector(selectComment);
    const userState = useSelector(selectUser);

    const getName = (id: Number) => {
      const target = userState.users.find((u) => u.id == id);
      return target?.name;
    }
  
    return (
      <div>
        <h2>Comments</h2>
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