//const { default: knex } = require("knex");
require("dotenv").config();
const knexConfig = require("../db/knexfile").development;
const knex = require("knex")(knexConfig);

//selecting data
/* knex
    .select("*")
    .from("user_employer")
    .then((data) => {
        console.log(data);
    }) */

//Join credentials with user_applicant
knex('credentials')
    .join('user_applicant', 'credentials.id', '=', 'user_applicant.credentials_id')
    .where({
        user_type: 'applicant'
    })
    .select('*')
    .then((data) =>{
        console.log(data)
    });
