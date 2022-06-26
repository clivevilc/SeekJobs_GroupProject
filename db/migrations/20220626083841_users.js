/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable("users", (table) =>{
        table.increments();
        table.string("username").unique().notNullable();
        table.string("password").notNullable();
        table.timestamps(false, true);
        })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("users");
  
};