/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('job_listing').del()
  await knex('job_listing').insert([
    {id: 1, title: 'Financial Analyst', salary: 30000, job_type: "full-time", description:"description here", user_employer_id:1},
    {id: 2, title: 'Software Engineer', salary: 25000, job_type: "full-time", description:"description here", user_employer_id:1},
    {id: 3, title: 'Software Engineer', salary: 15000, job_type: "part-time", description:"description here", user_employer_id:2},
    {id: 4, title: 'Front-end Developer', salary: 12000, job_type: "part-time", description:"description here", user_employer_id:2},
    {id: 5, title: 'Senior Software Engineer', salary: 45000, job_type: "full-time", description:"description here", user_employer_id:2},
    {id: 6, title: 'Sales Specialist', salary: 15000, job_type: "part-time", description:"description here", user_employer_id:3}
  ]);
};
