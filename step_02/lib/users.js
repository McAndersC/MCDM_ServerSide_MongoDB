const fs = require('fs');
const uuid = require('uuid');

const users = {};

users.readJsonFile = (file, callback) => {

    fs.readFile(file, 'utf8', (err, data) => {

        return callback(err, data);

    })

}

users.getUsers = (payload, callback) => {

    users.readJsonFile('./.data/users.json', (err, data) => {
        
        if(err) {

            return callback(503, {'message' : 'Der opstod et internt problem'});

        }

        return callback(200, data);
       
    })
}

users.createUser = (payload, callback) => {

    console.log('Payload', payload);

    let generatedId = uuid.v4();
    let userName = payload.username;

    fs.readFile('./.data/users.json', (err, data) => {

        if (err) {

            console.log(err);

        } else {

            let newData = JSON.parse(data);

            let newUser = {
                _id: generatedId,
                username: userName,
                profile: 'filename.png'
            }

            let userNameExists = newData.find((user) => user.username === newUser.username);
        
            if(userNameExists === undefined) {

                newData.push(newUser)

                fs.writeFile('./.data/users.json', JSON.stringify(newData), 'utf8', (err) => {

                    if(err) {
                        throw err;
                    }


                    return callback(200, {'message':'Bruger er oprettet.'});
                })

            } else {
                return callback(409, {'message' : 'Bruger med dette brugernavn eksistere allerede'})
            }
        }
    })
  
}

module.exports = users;