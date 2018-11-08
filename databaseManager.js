'use strict'
const dbconfig = require('./dbconfig');
const mysql = require('promise-mysql');
const { CreateResponse } = require('./responseManager');
const dbscripts = require('./databaseScripts');

const createConnection = () => {
    return mysql.createConnection(dbconfig.connectionParams)
    .then((conn)=>{
        console.log('connected to the db');
        var connection = conn;
        connection.changeUser({database: dbconfig.databaseName});
        return connection;
    });
};

module.exports.INSERT_ITEM = (query,body,callback) =>{
    const parameters = Object.keys(body).map((key) => {
        return body[key];
    });
    var connection;
   return createConnection()
    .then((conn) => {
        connection = conn;
        return connection.query(query, parameters);         
    })
    .then((res)=>{
        console.log('query executed');                
        connection.end();
        return res.insertId;        
    })
    .catch((error)=>{
        if (connection && connection.end) connection.end();
        console.log(error);
        callback(null, CreateResponse(500,'Something went wrong while creating item'));
        // TODO: take all message in a separate file
    });
};

module.exports.GET_VEHICLE_BY_PLATE = (plate, callback) => {
    var connection;
    return createConnection()
        .then((conn) => {
            connection = conn;
            var vehicle = connection.query(dbscripts.SELECT_VEHICLE_BY_PLATE(), plate);
            return vehicle;
        })
        .then((res) => {
            console.log(res);
            console.log('query executed');
            return res;
        })
        .catch((error) => {
            if (connection && connection.end) connection.end();
            console.log(error);
            callback(null, CreateResponse(500,'Something went wrong while retrieving item'));
            // TODO: take all message in a separate file
        });
};