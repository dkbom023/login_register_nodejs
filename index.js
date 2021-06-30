const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const dbConnection = require('./database');
const { body, validationResult} = require('express-validator');
const { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } = require('constants');

const app = express();
app.use(express.urlencoded({ extended: false}))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(cookieSession({
    name:'session',
    
    keys: ['key1','key2'],
    maxAge: 3600*1000
}))

app.listen(3000, () => console.log("Server is running..."))