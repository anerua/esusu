require('express-async-errors');
require('winston-mongodb');
const winston = require('winston');

module.exports = function() {
    winston.exceptions.handle(
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    winston.add(new winston.transports.Console());
    winston.add(new winston.transports.MongoDB({
            db: 'mongodb://localhost/esusu',
            level: 'info',
            options: {
                useUnifiedTopology: true,
            } 
        }));
}