import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import modalComponentReducer from './reducers/modalComponentReducer';
import tokenReducer from './reducers/tokenReducer';
import userReducer from './reducers/userReducer';
import HPPR from './reducers/homePageProductsReducer';

export default () => {
    const store = createStore(combineReducers({
        modalComponent: modalComponentReducer,
        token: tokenReducer,
        user: userReducer,
        homePageProducts: HPPR
    }), applyMiddleware(thunk));
    return store; 
}