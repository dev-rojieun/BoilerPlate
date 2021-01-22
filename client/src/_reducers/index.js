//combineReducers 는 무엇을 하냐,, store 에 reducer 가 여러가지가 잇을 수있다... 왜그러냐면, reducer 가 하는 일이 어떻게 state가 변하는지를 알아낸다음 변한값을 리턴하는게 reducer 인데
// reduer에는 user나 subscrible 이나 post 등의 리듀서가 잇을 수 잇는데
// 우리는 redux 에서 가져온 combineReducers 를 이용하여 rootReducer로 하나로 합쳐준다.

import { combineReducers } from 'redux';
import user from './user_reducer';

const rootReducer = combineReducers({
     user
})

export default rootReducer;