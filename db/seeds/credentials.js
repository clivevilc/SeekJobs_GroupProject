/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('credentials').del()
  await knex('credentials').insert([
    {id: 1, username: 'clive', password: '123', user_type: 'applicant'},
    {id: 2, username: 'jasmine', password: 'abc', user_type:'employer'},
    {id: 3, username: 'jeff', password: 'qwe', user_type: 'applicant'}
  ]);
};
