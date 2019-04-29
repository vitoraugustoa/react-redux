import { combineReducers } from 'redux';
import todo from '../pages/Todo/redux/TodoReducers';


const rootReducer = combineReducers({
    todo,
});


export default rootReducer;