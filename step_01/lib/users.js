const fs = require('fs');

const users = {};

users.readJsonFile = (file, callback) => {

    fs.readFile(file, 'utf8', (err, data) => {

        return callback(err, data);

    })

}

users.getUsers = (payload, callback) => {

    users.readJsonFile('./.data/users.json', (err, data) => {

        return callback(200, data);

    })

}

module.exports = users;