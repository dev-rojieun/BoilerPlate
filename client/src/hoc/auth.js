import axios from 'axios';
import { response } from 'express';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

//HOC component 생성  >> 우리는 지금 HOC 컴포넌트만 만들고 HOC 안에 아무런 컴포넌트를넣지 않앗다. 컴포넌트를 넣기 위해 client/app.js 에서 수정하자
export default function (SpecificComponent , option, adminRout = null) {

     /*
     null  >> 아무나 출입가능한 페이지
          SpecificComponent 이거는 LandingPage
     true  >> 로그인 한 유저만 출입 가능

     false >> 로그인 한 유저는 출입 불가능
          
     */

     // 먼저, HOC 에서 Backend 에 Request를 날려 user의 상태를 체크하자.
     function AuthenticationCheck(props){

          const dispatch = useDispatch();

          useEffect(() => {
               
               //axios.get('/api/users/auth')  // server/index.js 에서 /api/user/auth 라우터에서 권한이 있는지  체크했으니까 ( middleware/auth.js 에서 토큰을 이용하여 유저 정보를 얻엇다. )
               // 원래는 위 코드 처럼 쓰지만 -> 리덕스를 쓸거임 -> action 을 날리기 위해 dispatch() 를 쓰고 는 useDispatch 라는 리덕스 훅을 쓸거구
               // 액션이름은 auth() 로 지정 >> auth를 import한 뒤>  1.user_action.js 에서 auth함수 생성 > 2.type.js에서 정의 > 3.user_reducer.js 에서도 처리 해준다.
               // 유저엑션에서.. axios 수정 > userReducer 에서 수정 > 
               dispatch(auth())  // 백엔드에서 처리한 reducer 정보들이 response 안에 저장된다.
                    .then(response => {
                         console.log('response', response);
                    });

               

          }, [])
     }

     return 
}