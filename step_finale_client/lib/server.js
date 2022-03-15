// Require Node Dependencies.
const express = require('express');
const cors = require('cors');
const multer  = require('multer');
const dotenv = require('dotenv');

dotenv.config();

// Vores egen afhægigheder
const users = require('./users');

// Multer Setup for storage.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '.png');
  }
})



// Constants.
const expressServer = express();
const server = {};
const upload = multer({ storage: storage })

// Express Metoder. De fungere som hjælpere til at håndtere http requests osv.
expressServer.use(express.json());
expressServer.use(express.urlencoded({extended: true}));
expressServer.use(express.static('uploads'));
expressServer.use(cors());

// GET - Users.
expressServer.get('/users', (req, res) => {

    users.getUsers((code, returnObj) => {
        
        res.setHeader('content-type', 'application/json');
        res.status(code).send(returnObj);

    })

});

// POST - Users 
expressServer.post('/users', (req, res) => {

    users.createUser(req.body, (code, returnObj) => {

        res.status(code).send(returnObj);

    });

});

// PUT - Users 
expressServer.put('/users', (req, res) => {

    users.updateUser(req.body, (code, returnObj) => {

        res.setHeader('content-type', 'application/json');
        res.status(code).send(returnObj);

    });

});

// DELETE - Users 
expressServer.delete('/users', (req, res) => {
    
    if(req.body.deleteAll) {

        users.deleteAll(req.body, (code, returnObj) => {

            res.status(code).send(returnObj);
    
        });

    }
    else {
        users.deleteUser(req.body, (code, returnObj) => {

            res.status(code).send(returnObj);
    
        });
    }
    /*
    users.deleteUser(req.body, (code, returnObj) => {

        res.status(code).send(returnObj);

    });
*/
});


// POST - Profile Image 
expressServer.post('/profileimage', upload.single('profile'), (req, res) => {

    res.status(200).send({'message':'Profile billede uploaded'});

});


// POST - Profile
expressServer.post('/profile', (req, res) => {

    users.updateProfile(req.body, (code, returnObj) => {
        res.status(code).send(returnObj);
    });

});



// Init metode til at starte serveren.
server.run = () => {

    // Getting Server Port to listen for.
    let port = process.env.PORT;


    // Start HTTP serveren.
    expressServer.listen(port, () => {


        console.log('\x1b[32m%s\x1b[0m','------------------------\n');
        console.log('\x1b[32m%s\x1b[0m','Serveren benytter følgende adresse http://localhost:' + port);
        console.log('\x1b[32m%s\x1b[0m','Benytter vi MongoDB: ' + process.env.MONGO_DB_ACTIVE );

        if(process.env.MONGO_DB_ACTIVE == 'true')
        {
            console.log('\x1b[32m%s\x1b[0m','MongoDB: ' + process.env.MONGO_DB);
            console.log('\x1b[32m%s\x1b[0m','MongoDBName: ' + process.env.MONGO_DB_NAME);
        }
        
        console.log('\x1b[32m%s\x1b[0m','\n------------------------');

    });

}

// Exporting
module.exports = server;