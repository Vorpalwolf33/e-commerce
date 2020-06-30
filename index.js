const path = require('path');
const configDB = require('./config/configDB');
const routes = require('./config/routes');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3010;

configDB();

if(process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
}

app.use(express.json());
app.use(cors());
app.use('/', routes);

app.listen(PORT, () => {
    console.log('listening to port: ', PORT);
}); 