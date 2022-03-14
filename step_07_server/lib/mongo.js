const MongoClient = require('mongodb').MongoClient;


const mongo = {}

const urlToMongo = 'mongodb://localhost:27017/';
const userCollection = 'Users';

mongo.createUser = async (payload, callback) => {

    console.log('Payload', payload);

    const db = await MongoClient.connect(urlToMongo);
    const dbo = db.db('TestUsers')

    let entry = {
        profile: 'filename.png',
        username: payload.username
    }

    return new Promise( function(resolve, reject) {

        dbo.collection(userCollection).insertOne( entry, (err, user) => {

            if(err) {

                return reject(err)
            }

            db.close();
            return resolve(user);

        })


    })

}

module.exports = mongo;