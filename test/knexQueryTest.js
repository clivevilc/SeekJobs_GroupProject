//const { default: knex } = require("knex");
require("dotenv").config();
const knexConfig = require("../db/knexfile").development;
const knex = require("knex")(knexConfig);

//selecting data
knex
    .select("*")
    .from("credentials")
    .then((data) => {
        console.log(data);
    })
