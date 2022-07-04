/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('credentials').del()
  await knex('credentials').insert([

    { username: 'clive', password: '123', user_type: 'applicant', hash:'$2b$10$zEhr.mtUzcmInboERD6eAOQiC82N6TWsB8kHJyTMSL5HtacRFDfmm'},
    { username: 'meta', password: 'abc', user_type:'employer', hash:'$2b$10$qCPvpFkliAuGGu0c/jgtzOipFrHLvtophfm7HICN1zhkEN/Gy1tnG'},
    { username: 'jeff', password: 'qwe', user_type: 'applicant', hash:'$2b$10$y2WqG.3lm/fDWjFvq15vb.swRoXZT18Tets/CyITWcy7wBQteWBxy'},
    { username: 'amazon', password: 'qwe', user_type: 'employer', hash:'$2b$10$y2WqG.3lm/fDWjFvq15vb.swRoXZT18Tets/CyITWcy7wBQteWBxy'},
    { username: 'google', password: 'qwe', user_type: 'employer', hash:'$2b$10$y2WqG.3lm/fDWjFvq15vb.swRoXZT18Tets/CyITWcy7wBQteWBxy'},
    { username: 'jasmine', password: '123', user_type: 'applicant', hash:'$2b$10$zEhr.mtUzcmInboERD6eAOQiC82N6TWsB8kHJyTMSL5HtacRFDfmm'},

  ]);
};
