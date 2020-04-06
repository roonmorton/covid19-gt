'user strict';

var mysql = require('mysql');

/*
    DB Prod: esdavil1_c19prod
    Password: 9DS(h~M{FuPt

*/

var dbconfig = {
    host: '',
    port: '3306',
    connectionLimit: 10,
    user: '',
    password: '',
    database: ''
};


const connection = mysql.createPool(dbconfig);
connection.on('connection', (connection) => console.log(`New connection stablished with server on thread #${connection.threadId}`))

// ... later
//pool.query('select 1 + 1', (err, rows) => { /* */ });
// var connection;

// function handleDisconnect() {
//     connection = mysql.createConnection(dbconfig); // Recreate the connection, since
//     // the old one cannot be reused.

//     connection.connect(function(err) { // The server is either down
//         if (err) { // or restarting (takes a while sometimes).
//             console.log('error when connecting to db:', err);
//             setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
//         } // to avoid a hot loop, and to allow our node script to
//     }); // process asynchronous requests in the meantime.
//     // If you're also serving http, display a 503 error.
//     connection.on('error', function(err) {
//         console.log('db error', err);
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
//             handleDisconnect(); // lost due to either server restart, or a
//         } else { // connnection idle timeout (the wait_timeout
//             throw err; // server variable configures this)
//         }
//     });
// }

// handleDisconnect();
// //local mysql db connection
// var connection = mysql.createConnection({
//     host: 'mysql1008.mochahost.com',
//     port: '3306',
//     user: 'esdavil1_david',
//     password: 'admin1342GT',
//     database: 'esdavil1_covid19'
// });

// connection.connect(function(err) {
//     if (err) throw err;
// });

module.exports = connection;