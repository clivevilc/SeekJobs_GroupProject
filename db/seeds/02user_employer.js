/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_employer').del()
  await knex('user_employer').insert([
    { company_name: 'Meta', location: 'Hong Kong', industry: 'Business', credentials_id:2},
    { company_name: 'Amazon', location: 'United States', industry: 'Business', credentials_id:4},
    { company_name: 'Google', location: 'United Kingdom', industry: 'IT', credentials_id:5}
  ]);
};
