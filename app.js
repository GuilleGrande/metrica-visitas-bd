'use strict';

const Sequelize = require('sequelize');

const sequelize = new Sequelize('c9', 'guillegrande', {
    host: process.env.IP,
    dialect: 'mysql'
});