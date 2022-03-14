const express = require('express');
const users = require('./users');
const mongo = require('./mongo');
const cors = require('cors');
const expressServer = express();

// Express server middleware.
expressServer.use(express.json());
expressServer.use(cors());

const server = {};

expressServer.get('/', (req, res) => {

    res.status(200).send('<h1>Server brug /users endpoints</h1>');

})

expressServer.get('/users', (req, res) => {

    return users.getUsers(req.body, (code, returnObj) => {

        res.setHeader('content-type', 'application/json')
        res.status(code).send(returnObj);

    })

})

expressServer.post('/users', (req, res) => {

    mongo.createUser(req.body, (code, returnObj) => {
        
        res.setHeader('content-type', 'application/json')
        res.status(code).send(returnObj);
        
    }) 

    /*
    users.createUser(req.body, (code, returnObj) => {
        
        res.setHeader('content-type', 'application/json')
        res.status(code).send(returnObj);
        
    })  
    */
})

server.run = () => {

    console.log('Server run');

    expressServer.listen(3000, () => {

        console.log('Serveren Kører på http://localhost:3000');

    })

}

module.exports = server;