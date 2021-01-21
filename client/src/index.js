import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Ant Design 프레임워크 임폴트
import 'antd/dist/antd.css';

// 리덕스 임플트
import { Provider } from 'react-redux';  // 다운받은 react-redux에 Provider 를 가져와서
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

const createStreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

/* 이렇게 Provider로 <app /> 컴포넌트에 감싸주면, redux와 application 을 연결시켜준다. 
    Provider 안에  store 를 넣어주고, 이 store 안에 이것저것 넣어줘야한는데, 여기서 미들웨어(프로미스, 턴크)를 이용해야 객체만 받는 store가 promise와 function 을 받게 해준다 이 처리를 위해 middleware(16번줄 입력시 12번줄 자동생성)를 통해 import -> promise , thunk 설치
    createStore 를 가져오는데, 원래는 createStore만 해서 스토어를 리덕스에서 생성하는데.. 그냥 스토어는 객체만 받으므로 미들웨어와함꼐 만들어준다.
      이렇게 만든 createStreWithMiddleware 를 stroe 에 넣어준다.
    다음, _redux 폴더에 index.js 를 만들어두고 import 해준다.
*/

ReactDOM.render(
  
  <Provider
    store={createStreWithMiddleware(Reducer, )}
  >  
    <App />
  </Provider>
  , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
