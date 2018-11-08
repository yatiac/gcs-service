//#region CREATE TABLES
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
    )`
};

// CREATE TABLE VEHICLES
module.exports.CREATE_TABLE_VEHICLES = () => {
    return `create table if not exists vehicles(
        id int primary key auto_increment,
        plate varchar(8) not null,
        maker varchar(48) not null,
        model varchar(48) not null,
        color varchar(48) not null,
        vin varchar(255) not null,
        year int not null,
        owner_id int not null
    )`
};

// CREATE TABLE OWNERS
module.exports.CREATE_TABLE_OWNERS = () => {
    return `create table if not exists owners(
        id int primary key auto_increment,
        name varchar(128) not null,
        email varchar(128) not null,
        phone varchar(16) not null
    )`
};

// CREATE TABLE MECHANICS
module.exports.CREATE_TABLE_MECHANICS = () => {
    return `create table if not exists mechanics(
        id int primary key auto_increment,
        name varchar(128) not null        
    )`
};

// CREATE TABLE TYPES
module.exports.CREATE_TABLE_TYPES = () => {
    return `create table if not exists types(
        id int primary key auto_increment,
        name varchar(64) not null
    )`
};

// CREATE TABLE STATUS
module.exports.CREATE_TABLE_STATUS = () => {
    return `create table if not exists status(
        id int primary key auto_increment,
        name varchar(64) not null
    )`
};

// CREATE TABLE WORKS
module.exports.CREATE_TABLE_WORKS = () => {
    return `create table if not exists works(
        id int primary key auto_increment,
        work_order_id int not null,
        price decimal(5,2) not null,
        date datetime not null,
        comments varchar(255)
    )`
};
//#endregion

//#region SELECTS
module.exports.SELECT_VEHICLE_BY_PLATE = () => {
    return `SELECT vehicles.id, plate, maker, model, year, color, vin, name
            FROM vehicles 
            INNER JOIN owners
            ON vehicles.owner_id = owners.id
            WHERE plate = ?;`
};
//#endregion

//#region INSERTS
// VEHICLE
module.exports.INSERT_VEHICLE = () => {
    return `Insert into vehicles(
        plate,
        maker,
        model,
        color,
        vin,
        year,
        owner_id)
    VALUES(?,?,?,?,?,?,?); 
    `
};

module.exports.INSERT_OWNER = () => {
    return `INSERT INTO owners(
                    name,
                    phone,
                    email
                ) VALUES(?,?,?);`
};

module.exports.ADD_WORK = () => {
    return `INSERT INTO works(
                    work_order_id,
                    price,
                    date,
                    comments
    ) VALUES(?,?,?,?);`
}

//OWNER

//WORK ORDER

//#endregion

//#region UPDATES

//#endregion

//#region DELETES

//#endregion