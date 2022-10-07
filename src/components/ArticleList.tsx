import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate, Navigate } from 'react-router-dom'
import Article from './Article'

type ArticleType = {
    id: number;
    title: string;
    author: string;
};

function ArticleList() {
    const navigate = useNavigate();
    const [articles, setArticles] = useState<ArticleType[]>([
        {id: 1, title: "test_1", author: "user_1"},
        {id: 2, title: "test_2", author: "user_2"},
        {id: 3, title: "test_3", author: "user_3"}
    ]);
 

	// 페이지 렌더링 후 가장 처음 호출되는 함수
    useEffect(() => {
        axios.get('/articles')
        .then(res => console.log(res))
        .catch(function (error) {
            if (error.response) {
              // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
            else if (error.request) {
              // 요청이 이루어 졌으나 응답을 받지 못했습니다.
              // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
              // Node.js의 http.ClientRequest 인스턴스입니다.
              console.log(error.request);
            }
            else {
              // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
    },
    // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    [])
 
    return (
        <div>
            <h1>Article List</h1>
            <button id='create-article-button' style={{ padding: '7px 10px', fontWeight: 'bold' }}> Create Article </button>
            <hr />
            <div className="Articles">
                {articles.map((a) => {
                    return <Article id={a.id} title={a.title} author={a.author} />;
                    })} 
            </div>
        </div>
    )
}
 
export default ArticleList;