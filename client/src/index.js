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

ReactDOM.render(
  
  <Provider store={createStreWithMiddleware(Reducer, window.__REDUX_DEVTOOLS_EXTENSION___ && window.__REDUX_DEVTOOLS_EXTENSION___() )} >  
    <App />
  </Provider>
  , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
