import { useNavigate } from 'react-router-dom'

interface IProps {
    title: string;
    id: number;
    author: string | undefined;
}

const Article = (props: IProps) => {
    const navigate = useNavigate();
    return (
        <div className="Article">
            <div className="a_id">
                {props.id}
            </div>
            <button className="a_title" onClick={() => { return navigate(`/articles/${props.id}`) }}>
                {props.title}
            </button>
            <div className="a_author">
                {props.author}
            </div>
        </div>
    ); 
};
export default Article;