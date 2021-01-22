import {
     LOGIN_USER,
     REGISTER_USER,
     AUTH_USER
} from '../_actions/types';

export default function user_reducer (state = {}, action) {
switch (action.type) {
     case LOGIN_USER:
          return { ...state, loginSuccess: action.payload }
          
     case REGISTER_USER:
          return { ...state, register: action.payload }

     case AUTH_USER:
          return { ...state, userData: action.payload }  // 왜 여기서 userData라고 지정햇냐면, server/index.js 의 auth 라우터에서 보면 -> 모든걸 처리하고 난다음 유저정보들을 json 형태로 client에게 전해주고잇다. ==> action.payload 여기에 해당 유저의 정보가 들어가잇다!
          
     default:
          return state;
}
}