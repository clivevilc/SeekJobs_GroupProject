/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('saved_listing').del()
  await knex('saved_listing').insert([
    {applicant_id: 1, listing_id: 1},
    {applicant_id: 1, listing_id: 2},
    {applicant_id: 2, listing_id: 1}
  ]);
};
