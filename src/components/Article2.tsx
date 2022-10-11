import { selectUser } from "../store/slices/user";
import { useSelector } from "react-redux";

interface IProps {
    title: string | undefined;
    content: string | undefined;
    author: number | undefined;
}

const Article2 = (props: IProps) => {
    const userState = useSelector(selectUser);
    const getName = (id: Number | undefined) => {
        if (id) {
            const target = userState.users.find((u) => u.id == id);
            return target?.name;
        }
    }
    return (
        <div className="Article">
            <p id="article-author">
                {getName(props.author)}
            </p>
            <p id="article-title">
                {props.title}
            </p>
            <p id="article-content">
                {props.content}
            </p>
        </div>
    ); 
};

export default Article2;