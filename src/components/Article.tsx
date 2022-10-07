import React from 'react';
import { useNavigate } from 'react-router-dom'

interface IProps {
    title: string;
    id: number;
    author: string;
}
const Article = (props: IProps) => {
    const navigate = useNavigate();
    return (
        <div className="Article">
            <p className="a_id">
                {props.id}
            </p>
            <p className="a_title" onClick={() => { return navigate(`/articles/${props.id}`) }}>
                {props.title}
            </p>
            <p className="a_author">
                {props.author}
            </p>
        </div>
    ); 
};
export default Article;