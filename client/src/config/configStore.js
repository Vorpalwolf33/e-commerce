import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import modalComponentReducer from './reducers/modalComponentReducer';
import tokenReducer from './reducers/tokenReducer';

export default () => {
    const store = createStore(combineReducers({
        modalComponent: modalComponentReducer,
        token: tokenReducer
    }), applyMiddleware(thunk));
    return store; 
}