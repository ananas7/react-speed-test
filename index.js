const path = require('path');
const express = require('express');
const Q = require('q');
const app = express();
const fs = require('fs');
const server = require("http").createServer(app);
const io = require('socket.io')(server);
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'root',
        password : '1234',
        database : 'react-test-speed',
        charset  : 'utf8'
    },
    debug: true,
    pool: {
        min: 0,
        max: 10
    }
});
// Generate values for table
//
// function makeid(n) {
//     var text = "";
//     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     for (let i = 0; i < n; i++) {
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return text;
// }
// let users = [];
// for (let i = 0; i < 1000; ++i) {
//     users.push({
//         login: makeid(Math.floor((Math.random() * 50) + 10)),
//         password: makeid(Math.floor((Math.random() * 50) + 10)),
//         email: makeid(Math.floor((Math.random() * 50) + 10)) + '@domain.com',
//         mark: Math.floor((Math.random() * 100) + 1)
//     });
// }
// knex('users')
//     .insert(users)
//     .catch(function(error) {
//         console.error(error);
//     });
app.use('/', express.static(path.join(__dirname, 'target')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/target/index.html'));
});
io.on('connection', function (socket) {
	socket.on("loadDataServer", () => {
        setInterval(function() {
            Q.spawn(function*() {
                const data = yield knex('users')
                    .orderByRaw('RAND()')
                    .limit(100).catch (function(e) {
                        console.log(e);
                    });
                socket.emit('loadDataClient', JSON.stringify(data));
            });
        }, 20);
	});
});
server.listen(8080, () => {
    console.log('Server listen 8080 port');
});
