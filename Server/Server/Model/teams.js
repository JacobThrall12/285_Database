const connection = require('./connection');

async function insertTeam(parameters = {}) {
    const insertSql = 'INSERT INTO user_created_teams (creator, team_name, head_coach) VALUES(?, ?, ?)'
    let queryParameters = [
        parameters.creator,
        parameters.team_name,
        parameters.head_coach,
      
    ];
    return await connection.query(insertSql, queryParameters);
}
async function combineTables(parameters = {}) {
    let selectSql = 'SELECT t.*, c.name, p.position, u.team_name FROM teams_and_pokemon t INNER JOIN create_a_team_prototype c ON t.pokemon_id = c.id INNER JOIN user_created_teams u ON t.team_id = u.id INNER JOIN positions p ON t.position_id = p.id;',
    queryParameters = [],
    whereStatements = [];
   
return await connection.query(selectSql, queryParameters);
}


module.exports = {
    insertTeam,
    combineTables
}