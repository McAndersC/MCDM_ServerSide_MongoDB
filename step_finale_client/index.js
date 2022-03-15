const server = require('./lib/server');

const app = {};
// Applications Initialisering.
app.init = () => {

    server.run();

};

// Kalder Initializing af applicationen.
app.init();

module.export = app;