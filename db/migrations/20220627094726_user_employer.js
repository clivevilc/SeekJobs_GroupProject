/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("user_employer", (table) => {
    table.increments().primary();
    table.string("company_name").notNullable();
    table.string("location").notNullable();
    table.string("industry");
    table.integer("credentials_id").unsigned();
    table.foreign("credentials_id").references("credentials.id");
    table.timestamps(false, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("user_employer");
};
