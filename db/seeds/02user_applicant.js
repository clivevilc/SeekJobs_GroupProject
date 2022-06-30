/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_applicant').del()
  await knex('user_applicant').insert([
    { first_name: 'first', last_name: 'last', upload_cv: 'true', credentials_id:3},
    { first_name: 'firstname', last_name: 'lastname', upload_cv: 'false', credentials_id:1}
  ]);
};
