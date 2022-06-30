//user queries that could link 
const development = require("./knexfile").development;
const knex = require("knex")(development);
const hashFunction = require("../passport/hashFunction")
const TABLE_NAME = "credentials"

