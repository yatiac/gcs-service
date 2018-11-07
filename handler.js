'use strict';
const mysql = require('promise-mysql');
const dbconfig = require('./dbconfig');
const dbscripts = require('./databaseCreation');

const CreateResponse = (code, body) => {
  var response = {
    statusCode: code,
    body: JSON.stringify(body)
  }
  return response;
};

module.exports.createDatabase = (event, context) => {
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
      connection.query(dbscripts.CREATE_TABLE_MECHANICS());
      console.log('Table Mechanics created');
  }).then(()=>{
      connection.query(dbscripts.CREATE_TABLE_TYPES());
      console.log('Table Types created');
  }).then(()=>{
      connection.query(dbscripts.CREATE_TABLE_STATUS());
      console.log('Table Status created');
  }).then(()=>{
      connection.query(dbscripts.CREATE_TABLE_WORKS());
      console.log('Table Works created');
  })
  .then(()=>{
    connection.end();
  });
  context.done(null,{message: 'Success'});
};

module.exports.createWorkOrder = async (event, context, callback) => {  
  const {type_id, status_id, mechanic_id, vehicle_id, symptoms} = JSON.parse(event.body);  
  return CreateResponse(201,{id: 1});
};

module.exports.createVehicle = async (event, context) => {
  const {plate, maker, model, color, vin, owner_id} = JSON.parse(event.body);
  return CreateResponse(201, {id: 1});
}
