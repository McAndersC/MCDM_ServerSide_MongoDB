const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Miljø (Environment) Variabel Setup
const dotenv = require('dotenv');

// Kør config for at kunne læse environement variabler.
dotenv.config();

// Mongo Settings
const url = process.env.MONGO_DB;
const dbName = process.env.MONGO_DB_NAME;
const dbUserCollection = 'Users';

// Mongo Modul.
const mongo = {};

mongo.getUsers = async () => {

    const db = await MongoClient.connect(url);
    const dbo = db.db(dbName);

    /*
    
        Vi opretter et "Promise" omkring et MongoDB "collection" kald.
        Vores Promise "resolver" hvis alt er godt = resolve(users)
        Eller vores Promise "rejecter" hvis det går skidt. = reject(err)

        Og da vi returnere dette promise, kan vi afventet resultatet
        de steder vi kalder mongo.getUsers(...).then(...) som vi gør i users.js 
    
    */
    return new Promise( (resolve, reject) => {

        dbo.collection(dbUserCollection).find().toArray( (err, users) => {
          
         if (err) {

           // Når vi rejecter dette Promise han vi gribe den ved hjlæp af en catch block
           return reject(err);

         }
         
         // Vi få alle dokumenter i vores Mongo users collection som et Array users[doc, doc, doc......]
         // Vi aflevere aller users ved at "resolve" vores Promise.
         return resolve(users);

        })

     })

};

mongo.insertUser = async (entry) => {

    const db = await MongoClient.connect(url);
    const dbo = db.db(dbName);

    let query = { username: entry.username };

    return new Promise( (resolve, reject) => {

        dbo.collection(dbUserCollection).find(query).toArray( (err, user) => {

            if (err) {

              return reject(err);

            }
      
            if(user.length === 0)
            {
                dbo.collection(dbUserCollection).insertOne( entry, (err, user) => {
                
                    if (err) {

                        return reject(err);
                        
                    }

                    db.close();
                    return resolve(user);
                    
                });

            } else {

                return resolve([]);

            }
        
          })
   
    })

};

mongo.deleteAll = async () => {

    const db = await MongoClient.connect(url);
    const dbo = db.db(dbName);

    return new Promise( (resolve, reject) => {
    
        dbo.collection(dbUserCollection).deleteMany({}, (err, data) => {

            if (err) {

                return reject(err);

            } 
        
            return resolve([]);

        });

    })
}

mongo.deleteUser = async (entry) => {

    const db = await MongoClient.connect(url);
    const dbo = db.db(dbName);

    let query = { username: entry.username };

    return new Promise( (resolve, reject) => {

        dbo.collection(dbUserCollection).findOne(query, (err, user) => {

            if (err) {

              return reject(err);

            }
      
            if(user.length !== 0)
            {

                dbo.collection(dbUserCollection).deleteOne(query, (err, obj) => {
            
                    if (err) {
        
                        return reject(err);
        
                    }
        
                    db.close();
                    return resolve(user);
                  
                  
                });

            } else {

                return resolve([]);

            }
        
        })
    })

};

mongo.updateUser = async (entry) => {

    const db = await MongoClient.connect(url);
    const dbo = db.db(dbName);

    let query = { username: entry.username };
    let newNameQuery = { username: entry.newUserName };

    return new Promise( (resolve, reject) => {

        let newvalues = { $set: {username: entry.newUserName  } };
        dbo.collection(dbUserCollection).findOne(newNameQuery, (err, user) => {

            if (err) {

                return reject(err);
  
            }

            if(!user)
            {

                dbo.collection(dbUserCollection).updateOne( query, newvalues, (err, data) => {
            
                    if (err) {

                        return reject(err);
                        
                    }

                    db.close();
                
                    return resolve({'message' : `Brugernavnet ${entry.username} er opdateret til ${entry.newUserName}`});

                });

            } else {

                return resolve({'message' : 'Brugernavnet Eksistere allerede'});

            }
        })
    })

}

mongo.updateProfile = async (entry) => {

    console.log('Update Profile entry', entry);

    const db = await MongoClient.connect(url);
    const dbo = db.db(dbName);

    let query = { username: entry.username };

    return new Promise( (resolve, reject) => {

        let newvalues = { $set: {profile: entry.profile  } };

        dbo.collection(dbUserCollection).updateOne( query, newvalues, (err, user) => {
        
            if (err) {

                return reject(err);
                
            }

            db.close();
            return resolve(user);
            
        
        });
    })

}


// Exportering.
module.exports = mongo;