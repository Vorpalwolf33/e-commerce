import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import modalComponentReducer from './reducers/modalComponentReducer';
import tokenReducer from './reducers/tokenReducer';
import userReducer from './reducers/userReducer';
import HPPR from './reducers/homePageProductsReducer';
import productReducer from './reducers/productReducer';
import productListReducer from './reducers/productListReducer';
import categoriesReducer from './reducers/categoryReducer';
import cartReducer from './reducers/cartReducer';
import ordersReducer from './reducers/orderReducer';
import redirectReducer from './reducers/redirectReducer';

export default () => {
    const store = createStore(combineReducers({
        modalComponent: modalComponentReducer,
        token: tokenReducer,
        user: userReducer,
        homePageProducts: HPPR,
        product: productReducer,
        productsList: productListReducer,
        categories: categoriesReducer,
        cart: cartReducer,
        orders: ordersReducer,
        redirect: redirectReducer
    }), applyMiddleware(thunk));
    return store; 
}