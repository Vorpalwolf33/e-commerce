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
routes.post('/account/category/add', authoriseUser, categoryControllers.add);
routes.get('/account/categories', authenticateUser, categoryControllers.show);
routes.get('/account/products', authoriseUser, productControllers.list);
routes.get('/guest/products', productControllers.list);
routes.get('/product/:id', productControllers.show);
routes.post('/account/orders/add', authenticateUser, orderControllers.add);
routes.post('/account/cart/add', authenticateUser, userControllers.addToCart);

module.exports = routes;