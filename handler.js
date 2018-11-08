'use strict';
const mysql = require('promise-mysql');
const dbscripts = require('./databaseScripts');
const dbmanager = require('./databaseManager');
const { CreateResponse } = require('./responseManager');
const dbconfig = require('./dbconfig');

module.exports.createDatabase = (event, context, callback) => {
  var connection;
  mysql.createConnection(dbconfig.connectionParams)
    .then(conn => {      
      connection = conn;
      connection.query(`CREATE database if not exists ${dbconfig.databaseName}`);
      connection.changeUser({database: dbconfig.databaseName});
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
  }).then(() => {
    context.done(null, CreateResponse(200, {message: 'Database created succesfully'}));
  }).catch((error) => {
    if (connection && connection.end) connection.end();
    //logs out the error
    console.log(error);    
    callback(null, CreateResponse(500, error));
  });
};

module.exports.createWorkOrder = async (event, context, callback) => {  
  const body = JSON.parse(event.body);
  const result = Object.keys(body).map((key) => {
    return body[key];
  })
  console.log(result);
  return callback(null,CreateResponse(201,result));
};

module.exports.createVehicle = (event, context, callback) => {
  const body = JSON.parse(event.body);  
  const insertScript = dbscripts.INSERT_VEHICLE();
  dbmanager.INSERT_ITEM(insertScript, body, callback)
  .then((insertedID)=>{
    body.id = insertedID;
    callback(null, CreateResponse(201,body));
  });
};

module.exports.createOwner = (event, context, callback) => {
  const body = JSON.parse(event.body);  
  const insertScript = dbscripts.INSERT_OWNER();
  dbmanager.INSERT_ITEM(insertScript, body, callback)
  .then((insertedID)=>{
    body.id = insertedID;
    callback(null, CreateResponse(201,body));
  });
};

module.exports.addWork = (event, context, callback) => {
  const body = JSON.parse(event.body);  
  const insertScript = dbscripts.ADD_WORK();
  dbmanager.INSERT_ITEM(insertScript, body, callback)
  .then((insertedID)=>{
    body.id = insertedID;
    callback(null, CreateResponse(201,body));
  });
};

module.exports.getVehicleByPlate = (event, context, callback) => {
  const plate = event.pathParameters.plate;
  dbmanager.GET_VEHICLE_BY_PLATE(plate,callback)
  .then((vehicle) => {
    callback(null, CreateResponse(200,vehicle));
  });
};