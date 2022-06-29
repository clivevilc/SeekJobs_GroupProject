/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('credentials').del()
  await knex('credentials').insert([
    { username: 'clive', password: '123', user_type: 'applicant'},
    { username: 'jasmine', password: 'abc', user_type:'employer'},
    { username: 'jeff', password: 'qwe', user_type: 'applicant'},
    { username: 'bibek', password: 'qwe', user_type: 'employer'},
    { username: 'sid', password: 'qwe', user_type: 'employer'},
  ]);
};
