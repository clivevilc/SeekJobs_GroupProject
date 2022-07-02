/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('credentials').del()
  await knex('credentials').insert([
    { username: 'clive', password: '123', user_type: 'applicant'},
    { username: 'meta', password: 'abc', user_type:'employer'},
    { username: 'jeff', password: 'qwe', user_type: 'applicant'},
    { username: 'amazon', password: 'abcd', user_type: 'employer'},
    { username: 'google', password: '12345', user_type: 'employer'},
    { username: 'jasmine', password: '12345', user_type: 'applicant'}
  ]);
};
