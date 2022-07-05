const { tableize } = require("i/lib/methods");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("saved_listing", (table) => {
        table.increments().primary();
        table.integer("applicant_id").unsigned();
        table.foreign("applicant_id").references("user_applicant.id")
        table.integer("listing_id").unsigned();
        table.foreign("listing_id").references("job_listing.id");
        table.timestamps(false,true);
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("saved_listing")
  
};
