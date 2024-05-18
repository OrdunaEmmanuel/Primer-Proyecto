const express = require('express');
const router = require('./router');
const Initdb = require('./config/db');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

Initdb();

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(router);

const server = app.listen(2000, () => {
    console.log('Servidor Listo ...');
});

server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    switch (error.code) {
        case 'EACCES':
            console.error(`El puerto ${port} requiere permisos elevados`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`El puerto ${port} está en uso`);
            process.exit(1);
            break;
        default:
            throw error;
    }
});
