interface IProps {
    title: string | undefined;
    content: string | undefined;
    author: string | undefined;
}

const Article2 = (props: IProps) => {
    return (
        <div className="Article">
            <p id="article-author">
                {props.author}
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