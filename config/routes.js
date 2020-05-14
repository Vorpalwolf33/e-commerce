const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => { res.json("Message from backend");})

module.exports = routes;