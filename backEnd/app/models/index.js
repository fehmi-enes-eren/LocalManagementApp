const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.todos = require("./todos.model.js")(mongoose);
db.users = require("./usersList.model.js")(mongoose);

module.exports = db;