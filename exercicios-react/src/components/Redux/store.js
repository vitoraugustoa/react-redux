import { combineReducers, createStore, applyMiddleware } from 'redux';
import contador from '../Contador/Redux/ContadorReducer';

var reducers = combineReducers({
    contador,
});