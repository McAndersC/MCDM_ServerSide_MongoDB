const fs = require('fs');
const uuid = require('uuid');
const mongo = require('./mongo');
const dotenv = require('dotenv');

dotenv.config();

// Denne variable 
console.log('MongoDB?: ', process.env.MONGO_DB_ACTIVE)

const users = {};
const useMongoDb = (process.env.MONGO_DB_ACTIVE === 'true');

// Hjælpe-metode til at læse fil forventer en fil og en callback funktion.
users.readJsonFile = (file, callback) => {

    fs.readFile(file, 'utf8', (err, data) => {
        
        return callback(err, data);

    })

}

/*

    Vi har lavet en getUsers "Asynkron" - "acync" funktion.
    
    getUsers skal returnere en status kode og enten:

    1. Vores brugere.
    2. Eller en fejlbesked.

    Vi sender det tilbage som et callback med to parameter callback(code, indhold);
    Det er kontrakten vi har skrevet for vores callback og dermed applikation.
    
    Så når vi ved mongoDB returnerer callback(200, result) er det fordi, vi henter resultatet fra mongo.getUsers()

*/
users.getUsers = (callback) => {

    if(useMongoDb)
    {
        return mongo.getUsers().then( result => {

            return callback(200, result);
    
        }).catch( (err) => {

            console.log(err);

        })

    } else {

        return users.readJsonFile("./.data/users.json", (err, data) => {

            if (err) {
    
                return callback(503, {'message':'Der opstod et internt problem'});
        
            }
         
            return callback(200, data);
    
        });

    }

}

/*

    updateProfile
    Denne benytter vi kun til at opdatere billedefil stien.

*/
users.updateProfile = async (payload, callback) => {
    
    if(useMongoDb)
    {
        mongo.updateProfile(payload).then( () => {

            callback(200, {'message':'Profilbillede er opdateret'});
    
        })

    } else {

        users.readJsonFile("./.data/users.json", (err, data) => {

            if (err) {

                return callback(503, {'message':'Der opstod et internt problem'});
        
            }
                
            data = JSON.parse(data);

            //Find vores bruger of opdatér brugeren.
            let newData = data.map((user) => {

                if(user.username === payload.username)
                {
                    user.profile = payload.profile
                }
            
                return user;

            });

            // Skriver filen med alle brugere
            fs.writeFile("./.data/users.json", JSON.stringify(newData), 'utf8', (err) => {
                        
                if (err) {
                
                    throw err;
                };

                
                return callback(200, {'message':'Profilbillede er opdateret'});
            });

        });
    }

}

/*

    updateUser
    Denne benytter vi til at kunne omdøbe brugernavnet.

*/
users.updateUser = (payload, callback) => {
    
    if(useMongoDb)
    {
 
        mongo.updateUser(payload).then(result => {
           
            return callback(200, result);

        })

    } else {

        users.readJsonFile("./.data/users.json", (err, data) => {

            if (err) {
    
                return callback(503, {'message':'Der opstod et internt problem'});
        
            }
                
            data = JSON.parse(data);
    
            // Et meget simpelt check på brugernavn.
            let userNameExists = data.find((user) => user.username === payload.username);
            let newUserNameExists = data.find((user) => user.username === payload.newUserName);
                    
            if(userNameExists === undefined || newUserNameExists !== undefined)
            {
                return callback(409, {'message':'Det ønskede navne-skift kunne ikke gennemføres, enten er bruger-navnet optaget eller du forsøger det samme navn.'});
            }
    
            //Find vores bruger.
            let newData = data.map((user) => {
    
                if(user.username === payload.username)
                {
                    user.username = payload.newUserName
    
                    if(payload.id) {
                        user.profile = payload.id + '.png'
                    }
                    
                }
               
                return user;
                
            });
    
    
            fs.writeFile("./.data/users.json", JSON.stringify(newData), 'utf8', (err) => {
                        
                if (err) {
                  
                    throw err;
                };
    
                return callback(200, {'message':'Brugernavnet er opdateret'});
            });
    
        });

    }
}

/*

    createUser
    Denne benytter vi til at kunne oprette en bruger.

*/
users.createUser = (payload, callback) => {

    let generatedId = uuid.v4();
    let userName = payload.username;

    
    if(useMongoDb)
    {
        let entry = {

            _id : generatedId,
            profile : 'filename.png',
            username : userName
    
        }

        mongo.insertUser(entry).then( result => {

            if(result.length !== 0) {

                return callback(200, {'message':`Ny Bruger ${result.insertedId} er oprettet.`});

            } else {

                return callback(409, {'message':'Brugernavnet eksisterer allerede'});

            }

        });

    } else {

        fs.readFile("./.data/users.json", (err, data) => {
        
            if (err) {
    
                console.log(err);
    
            } else {
    
        
                let newData = JSON.parse(data); //Vi burde fejl-sikre denne bedre.
        
                // New
                let newUser = {
                    _id: generatedId,
                    username: userName,
                    profile : 'filename.png'
                };
    
                // Et meget simpelt check på brugernavn.
                let userNameExists = newData.find((user) => user.username === userName);
    
                if(userNameExists === undefined)
                {

                    // Pushing Data
                    newData.push(newUser);

                    fs.writeFile("./.data/users.json", JSON.stringify(newData), 'utf8', err => {
                        
                        if (err) {
                            throw err;
                        };
    
                        return callback(200, {'message':'Bruger er oprettet.'});
                    });
                    
                } else {
    
                    return callback(409, {'message':'Bruger med dette brugernavn eksistere allerede'});
                    
                }
           
            }
        });

    }
    
}

users.deleteAll = (payload, callback) => {

    if(useMongoDb) {

        mongo.deleteAll().then( () => {

            return callback(200, {'message':'Alle Brugere er slettet.'});

        })

    } else {

        fs.writeFile("./.data/users.json", JSON.stringify([]), 'utf8', (err) => {
                        
            if (err) {
              
                throw err;
            };

            return callback(200, {'message':'Alle brugere er slettet.'});
        });

    }

}

/*

    deleteUser
    Denne benytter vi til at kunne slette en bruger.

*/
users.deleteUser = (payload, callback) => {

    if(useMongoDb)
    {
        mongo.deleteUser(payload).then( user => {

            if(user.profile !== 'filename.png')
            {
                users.deleteUserProfileImage(user.profile);
            }

            return callback(200, {'message':'Brugeren er slettet.'});

        });

    } else {

        return users.readJsonFile("./.data/users.json", (err, data) => {

            if (err) {
    
                return callback(503, {'message':'Der opstod et internt problem'});
        
            }
                
            data = JSON.parse(data);
    
            // Et meget simpelt check på brugernavn.
            let userNameExists = data.find((user) => user.username === payload.username);
            
    
            if(userNameExists === undefined)
            {
                return callback(409, {'message':'Den valgte bruger findes ikke.'});
            }
    
            
            // Her opretter vi et nyt array org med original dataen.
            let org = data;

            // Så splicer vi orginal array´et og fjerner brugeren som vi vil slettet.
            // Vi finder brugerens index og ved hjælp af splice fjerner vi den fra indexet.
            // rest indeholder det objekt vi har splicet fra. Dvs. i vores tilfælde den slettede bruger.
            // org indholder nu alle undtaget det splicede element.

            let indexTest = data.findIndex((user) => user.username === payload.username);
            let rest = org.splice(indexTest,1); 
    
            if(userNameExists.profile !== 'filename.png') {
    
                users.deleteUserProfileImage(userNameExists.profile);

            }
    
            // Her benytter vi vores org array og overskriver originalen filen med det nye array.
            fs.writeFile("./.data/users.json", JSON.stringify(org), 'utf8', (err) => {
                        
                if (err) {
                  
                    throw err;
                };
    
                // her udnytter vi vores rest variable som er et array med vores ene slettede bruger i.
                // derfor kan vi benytte rest[0].username for at få den slettede brugers navn.
                return callback(200, {'message':'Bruger ' + rest[0].username + ' er slettet.'});

            });
    
        });

    }

}

/*

    deleteUser
    Denne benytter vi til at kunne slette et billede.

*/
users.deleteUserProfileImage = (profileImage) => {

    fs.unlink('./uploads/' + profileImage, function(err) {

        if(err && err.code == 'ENOENT') {
        
            console.log("File eksistere ikke.");

        } else if (err) {
        
            console.log("Det skete en fejl.");

        } else {

            console.log(`Filen er fjernet.`);

        }

    });

}

module.exports = users;
