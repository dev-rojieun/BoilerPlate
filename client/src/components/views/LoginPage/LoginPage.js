import React, { useState } from 'react'
import { useDispatch } from 'react-redux'; // 디스패치를 이용하여 액션을 취한다 - 액션 다음 리듀서 - 순서로 나아갈 것이다.
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function LoginPage(props) {

    const dispatch = useDispatch();

    //컴포넌트 안에서 데이터를 변화할 때는 state
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();  // 이게없으면, 페이지가 리프레쉬 되서, 아래코드를 실행하지 못한다.

        //console.log('Email' , Email);
        //console.log('Password' , Password);

        // 서버에보낼떄는
        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    props.history.push('/')  // 로그인 성공시 랜딩페이지화면(./index.js)로 넘어간다.
                } else {
                    alert('Error') // 로그인 실패시 Error 메세지를 띄운다.
                }
            })
    }

    

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}


export default withRouter(LoginPage)