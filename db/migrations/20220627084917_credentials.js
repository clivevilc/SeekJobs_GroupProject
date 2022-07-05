/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable("credentials", (table) =>{
        table.increments().primary();
        table.string("username").unique().notNullable();
        table.string("hash");
        table.string("password").notNullable();
        table.string("user_type").notNullable();

        table.timestamps(false, true);
        })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("credentials");
  
};