import {deleteComment, editComment} from '../../store/slices/comment'
import { useDispatch } from "react-redux";
import { AppDispatch } from '../../store';

interface IProps {
    id: number;
    content: string;
    author: string | undefined;
    author_id: number;
}

const Comment = (props: IProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleEdit = () => {
        if (props.author_id === 1) {
            return (
                <button id='edit-comment-button' onClick={() => { 
                    commentEdit(props.content);
                 }}> 
                    Edit
                </button>
            );
        }
    }

    const commentEdit = (content: string) => {
        const new_content = window.prompt("Edit Comment", content);
        if (new_content) {
            dispatch(editComment({id: props.id, content: new_content}));
        }
    }

    const handleDelete = () => {
        if (props.author_id === 1) {
            return (
                <button id='delete-comment-button' onClick={
                    () => { 
                        dispatch(deleteComment(props.id));
                    }
                }> 
                    Delete
                </button>
            );
        }
    }

    return (
        <div className="Content">
            <div className="c_content">
                {props.content}
            </div>
            <div className="c_author">
                {props.author}
            </div>
            {handleEdit()}
            {handleDelete()}
        </div>
    ); 
};

export default Comment;