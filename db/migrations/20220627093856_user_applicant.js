/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("user_applicant", (table) =>{
    table.increments();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.boolean("upload_cv");
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
  return knex.schema.dropTable("user_applicant");
};
