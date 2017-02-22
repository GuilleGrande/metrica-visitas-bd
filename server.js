'use strict';

const Hapi = require('hapi');
const Sequelize = require('sequelize');
const models = require('./models');
const Path = require('path')
const server = new Hapi.Server();

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
        path:'/', 
        handler: function (request, reply) {
            reply.file('./views/visitas.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/vista-1',
        handler: function (request, reply) {
            reply.file('./views/vista-1.html');
            
            var visita = {
                ip_address: request.headers['x-forwarded-for'] || request.info.remoteAddress,
            };
            
            var visitante = models.visitantes;
            models.sequelize.sync().then(function(){
                visitante.create({
                    ip_address: visita.ip_address,
                });
            });
            
            var id_visitante = models.sequelize.query('SELECT "id" FROM visitantes WHERE ip_address = $ip_address', 
                                                        { bind: { ip_address: visita.ip_address }, 
                                                        type: models.sequelize.QueryTypes.SELECT });
            
            var vista_visitante = models.vistas_visitantes;
            models.sequelize.sync().then(function() {
               vista_visitante.create({
                   id_visitantes: id_visitante,
                   id_vistas: 1
               }); 
            });
        }
    });
    
    server.route({
        method: 'GET',
        path: '/vista-2',
        handler: function (request, reply) {
            reply.file('./views/vista-2.html');
            
            var visita = {
                ip_address: request.headers['x-forwarded-for'] || request.info.remoteAddress,
            };
            
            var visitante = models.visitantes;
            models.sequelize.sync().then(function(){
                visitante.create({
                    ip_address: visita.ip_address,
                });
            });
            
            var vista_visitante = models.vistas_visitantes;
            models.sequelize.sync().then(function() {
               vista_visitante.create({
                   id_visitantes: models.sequelize.query('SELECT "id" FROM visitantes WHERE ip_address = $ip_address', 
                                                        { bind: { ip_address: visita.ip_address }, type: models.sequelize.QueryTypes.SELECT }),
                   id_vistas: 2
               }); 
            });
        }
    });
    
    server.route({
        method: 'GET',
        path: '/vista-3',
        handler: function (request, reply) {
            reply.file('./views/vista-3.html');
            
            var visita = {
                ip_address: request.headers['x-forwarded-for'] || request.info.remoteAddress,
            };
            
            var visitante = models.visitantes;
            models.sequelize.sync().then(function(){
                visitante.create({
                    ip_address: visita.ip_address,
                });
            });
            
            var vista_visitante = models.vistas_visitantes;
            models.sequelize.sync().then(function() {
               vista_visitante.create({
                   id_visitantes: models.sequelize.query('SELECT "id" FROM visitantes WHERE ip_address = $ip_address', 
                                                        { bind: { ip_address: visita.ip_address }, type: models.sequelize.QueryTypes.SELECT }),
                   id_vistas: 3
               }); 
            });
        }
    });
    
    server.route({
        method: 'GET',
        path: '/visitas',
        handler: function (request, reply) {
            reply.file('./views/visitas.html');
            
            var visita = {
                ip_address: request.headers['x-forwarded-for'] || request.info.remoteAddress,
            };
            
            var visitante = models.visitantes;
            models.sequelize.sync().then(function(){
                visitante.create({
                    ip_address: visita.ip_address,
                });
            });
            
            var vista_visitante = models.vistas_visitantes;
            models.sequelize.sync().then(function() {
               vista_visitante.create({
                   id_visitantes: models.sequelize.query('SELECT "id" FROM visitantes WHERE ip_address = $ip_address', 
                                                        { bind: { ip_address: visita.ip_address }, type: models.sequelize.QueryTypes.SELECT }),
                   id_vistas: 4
               }); 
            });
        }
    });
    
});



models.sequelize.sync({}).then(function(){
    server.start((err) => {
        if (err) {
            throw err;
            
        }
    console.log('Server running at:', server.info.uri);
        
    });
    
});


