// CREATE TABLE WORK ORDERS
module.exports.CREATE_TABLE_WORKORDERS= () => {
return `create table if not exists work_orders(
    id int primary key auto_increment,
    date datetime not null,
    type_id int not null,
    status_id int not null,
    mechanic_id int not null,
    vehicle_id int not null,
    symptoms varchar(255) not null
)`};

// CREATE TABLE VEHICLES
module.exports.CREATE_TABLE_VEHICLES = () => {
return `create table if not exists vehicles(
    id int primary key auto_increment,
    plate varchar(8) not null,
    maker varchar(48) not null,
    model varchar(48) not null,
    color varchar(48) not null,
    vin varchar(255) not null,
    owner_id int not null
)`};

// CREATE TABLE OWNERS
module.exports.CREATE_TABLE_OWNERS = () => {
return `create table if not exists owners(
    id int primary key auto_increment,
    name varchar(128) not null,
    email varchar(128) not null,
    phone varchar(16) not null
)`};

// CREATE TABLE MECHANICS


// CREATE TABLE TYPES


// CREATE TABLE STATUS


// CREATE TABLE WORKS
// id int primary key auto_increment,
// work_order_id int not null,
// price decimal(5,2) not null
