const Datastore = require('nedb');
const database = new Datastore('database.db');

module.exports = database;