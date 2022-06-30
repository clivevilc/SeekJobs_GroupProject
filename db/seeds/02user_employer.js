/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_employer').del()
  await knex('user_employer').insert([
    { company_name: '123.inc', location: 'Hong Kong', industry: 'Finance', credentials_id:2},
    { company_name: 'ABC company', location: 'Beijing', industry: 'IT', credentials_id:4},
    { company_name: 'Hello Corp', location: 'Bangkok', industry: 'Business', credentials_id:5}
  ]);
};
