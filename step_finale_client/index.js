const server = require('./lib/server.js');

// App Modul Object
const app = {};

// Applications Initialisering.
app.init = () => {

    server.run();

};

// Kalder Initialisering af applikationen.
app.init();