const express = require('express');
const users = require('./users');
const expressServer = express();


const server = {};

expressServer.get('/', (req, res) => {

    res.status(200).send('<h1>Server brug /users endpoints</h1>');

})

expressServer.get('/users', (req, res) => {

    return users.getUsers(req.body, (code, returnObj) => {

        res.status(200).send(returnObj);

    })

})

server.run = () => {

    console.log('Server run');

    expressServer.listen(3000, () => {

        console.log('Serveren Kører på http://localhost:3000');

    })

}

module.exports = server;