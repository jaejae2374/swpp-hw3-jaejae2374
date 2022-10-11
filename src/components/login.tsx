import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { updateLogin, fetchUsers, selectUser } from "../store/slices/user";
import { AppDispatch } from '../store';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const userState = useSelector(selectUser);

    useEffect(() => {
        dispatch(fetchUsers())
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
 
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
 
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
 
    const onClickLogin = () => {
        if (email === "swpp@snu.ac.kr" && password === "iluvswpp") {
            dispatch(updateLogin({id:1, logged_in: true, email: email, password: password, name: "Software Lover"}));
            return navigate("/articles");
        } else {
            alert("Email or password is wrong");
        }
    }
    const handleLogin = () => {
        const target = userState.users.find((u) => u.id == 1);
        if (target?.logged_in) {
          return <Navigate to="/articles" />;
        }
      }
 
    return(
        <div>
            {handleLogin()}
            <h1>Login</h1>
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