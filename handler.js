'use strict';
const mysql = require('promise-mysql');
const dbconfig = require('./dbconfig');
const dbscripts = require('./databaseCreation');

module.exports.createDatabase = async (event, context) => {
  var connection;
  mysql.createConnection(dbconfig)
    .then(conn => {
      connection = conn;
      connection.query(dbscripts.CREATE_TABLE_WORKORDERS());
      console.log('Table Work Orders Created');      
  }).then(() => {
      connection.query(dbscripts.CREATE_TABLE_VEHICLES());
      console.log('Table Vehicles created');      
  }).then(()=>{
      connection.query(dbscripts.CREATE_TABLE_OWNERS());
      console.log('Table Owners created');
  }).then(()=>{
      connection.query();
      console.log('Table Mechanics created;');
  })
  .then(()=>{
    connection.end();
  });
  return {
    statusCode: 200   
  };
};
