const path = require('path');
const configDB = require('./config/configDB');
const routes = require('./config/routes');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3010;

configDB();

app.use(express.json());
app.use(cors());
app.use('/', routes);

app.listen(PORT, () => {
    console.log('listening to port: ', PORT);
}); 