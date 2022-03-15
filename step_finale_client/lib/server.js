const express = require('express');
const path = require('path');
const server = {};

// Constants.
const expressServer = express();

// Express server middleware.
// expressServer.use(express.static('src'));
expressServer.use(express.static(path.join(__dirname, '../src')))
// GET - Users 
expressServer.get('/', (req, res) => {

    // Her kan vi udskrive den mappe hvor denne fil ligger. Vi bruger en indbygget node variabel (__dirname).
    // console.log('Dirname'. __dirname)

    // Her benytter vi node api funktionen 'path' og metoden 'join' = path.join().
    // Den godtager to parmeter (__dirname, '../index.html);
    // Først tildeler vi den __dirname = denne mappe.
    // Derefter giver vi en relativ stil "tilbage" til vores index.html fil. '../index.html';
    // På denne måde sikre vi os at stien passer ligegyldig hvilken mappe vi flytter hele dette projekt til.

    // console.log(path.join(__dirname, '../index.html'))


    // Derfor kan vi sende index.html filen nå en bruger benytter localhost:3002
    res.sendFile(path.join(__dirname, '../index.html'));

});
expressServer.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../no-match.html'));

});



server.run = () => {

 
    let port = 3002;

    // Start HTTP serveren.
    expressServer.listen(port, () => {

    
        console.log('\x1b[32m%s\x1b[0m','------------------------\n');
        console.log('\x1b[32m%s\x1b[0m','Serveren benytter følgende adresse http://localhost:' + port);
        console.log('\x1b[32m%s\x1b[0m','\n------------------------');

    });

}

module.exports = server;