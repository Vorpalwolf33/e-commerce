const express = require('express');
const routes = express.Router();
const {authenticateUser, authoriseUser} = require('../app/middlewares/authentication');

const userControllers = require('../app/controllers/userControllers');
const productControllers = require('../app/controllers/productControllers');
const categoryControllers = require('../app/controllers/categoryController');
const orderControllers = require('../app/controllers/orderControllers');

routes.post('/register', userControllers.register);
routes.post('/login', userControllers.login);
routes.get('/account/home', authenticateUser, userControllers.home);
routes.get('/logout', authenticateUser, userControllers.logout);
routes.get('/', userControllers.home);
routes.post('/account/product/add', authoriseUser, productControllers.add);
routes.post('/account/product/update', authoriseUser, productControllers.update)
routes.post('/account/product/remove', authoriseUser, productControllers.remove);
routes.post('/account/category/add', authoriseUser, categoryControllers.add);
routes.post('/account/category/update', authoriseUser, categoryControllers.update);
routes.get('/account/categories', authenticateUser, categoryControllers.list);
routes.post('/account/category/remove', authenticateUser, categoryControllers.remove);
routes.get('/account/productsList', authoriseUser, productControllers.list);
routes.post('/account/orders/add', authenticateUser, orderControllers.add);
routes.get('/homePageProducts', productControllers.homeList);
routes.get('/account/homePageProducts', authenticateUser, productControllers.homeList);
routes.get('/product/:id', productControllers.show);
routes.post('/account/cart/add', authenticateUser, userControllers.addToCart);
routes.get('/account/cart', authenticateUser, userControllers.showCart);
routes.post('/account/cart/remove', authenticateUser, userControllers.removeFromCart);
routes.get('/account/cart/list', authenticateUser, userControllers.list);
routes.post('/account/wallet/addMoney', authenticateUser, userControllers.addMoneyToWallet);

module.exports = routes;