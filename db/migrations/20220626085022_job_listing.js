/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("job_listing", (table) =>{
        table.increments();
        table.string("company_name").notNullable();
        table.string("job_title").notNullable();
        table.string("location").notNullable();
        table.integer("salary").notNullable();
        table.timestamps(false, true);
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("job_listing");
};
