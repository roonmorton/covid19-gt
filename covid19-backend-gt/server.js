const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    http = require('http'),
    socketio = require('socket.io'),
    mysql = require('mysql'),
    port = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config();
}


var corsOptions = {
    origin: process.env.CORS || '*',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.listen(port);

//console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/approute'); //importing route
routes(app); //register the 

// const server = http.createServer(app) //creando el server con http y express como handle request
// const io = socketio(server) //iniciando el server de socket.io

// server.listen(9797, () => {
//     console.log(`Server running in http://localhost:${9797}`)
// })