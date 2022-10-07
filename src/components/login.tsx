import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
 
	// input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
 
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
 
	// login 버튼 클릭 이벤트
    const onClickLogin = () => {
        if (email === "swpp@snu.ac.kr" && password === "iluvswpp") {
            console.log("success");
            return navigate("/articles")
        } else {
            alert("Email or password is wrong");
        }
    }
 
	// 페이지 렌더링 후 가장 처음 호출되는 함수
    useEffect(() => {
        axios.get('/login')
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
 
    return(
        <div>
            <h2>Login</h2>
            <div>
                <label htmlFor='email-input'>Email : </label>
                <input type='text' id='email-input' value={email} onChange={handleEmail} />
            </div>
            <div>
                <label htmlFor='pw-input'>PW : </label>
                <input type='password' id='pw-input' value={password} onChange={handlePassword} />
            </div>
            <div>
                <button type='button' id="login-button" onClick={onClickLogin}>Login</button>
            </div>
        </div>
    );
}
 
export default Login;