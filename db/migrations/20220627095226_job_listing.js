/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("job_listing", (table) =>{
    table.increments();
    table.string("title").notNullable();
    table.integer("salary");
    table.string("job_type");
    table.string("description");
    table.integer("user_employer_id").unsigned();
    table.foreign("user_employer_id").references("user_employer.id");
    table.timestamps(false, true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("job_listing");
};
