'use strict';

const Hapi = require('hapi');
const Sequelize = require('sequelize');
const models = require('./models');

const server = new Hapi.Server();

const sequelize = new Sequelize('c9', 'guillegrande', {
    host: process.env.IP,
    dialect: 'mysql'
});


server.connection({ 
    host: process.env.IP, 
    port: process.env.PORT 
});

server.register(require('inert'), (err) => {
    
    if (err) {
        throw err;
    }
    
    server.route({
        method: 'GET',
        path:'/hello', 
        handler: function (request, reply) {
            reply("hello world");
        }
    });

    server.route({
        method: 'GET',
        path: '/evaluacion',
        handler: function (request, reply) {
            reply.file('./views/evaluacion.html');
        }
    });
});



models.sequelize.sync({force: true}).then(function(){
    server.start((err) => {
        if (err) {
            throw err;
            
        }
    console.log('Server running at:', server.info.uri);
        
    });
    
});


