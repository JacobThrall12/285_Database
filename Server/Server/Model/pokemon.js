const connection = require('./connection');

//Need all of these going forward (changing other five to this syntax)
//async function getAll(parameters = {}) {...}
//async function getById(id){...}
//async function update(parameters = {}) {...}
//async function delete(id) {...}


//PART 1 of 5 (SELECT) 
async function getAllPokemon(parameters = {}) {
    let selectSql = 'SELECT c.*, p.position_abbr, p.position FROM create_a_team_prototype c INNER JOIN positions p ON c.position_id = p.id',
        whereStatements = [],
        orderByStatements = [],
        queryParameters = [];
        
    if (typeof parameters.type !== 'undefined' && parseInt(parameters.type) === 0) {
        whereStatements.push("primary_type != 'Grass'");
        whereStatements.push("secondary_type != 'Grass'");
    }
                                     
    if (typeof parameters.name !== 'undefined' && parameters.name.length > 0) {
        const pokeName = parameters.name;
        whereStatements.push('name LIKE ?');
        queryParameters.push('%' + pokeName + '%');
    }

    if (typeof parameters.element !== 'undefined') {
        const elementType = parameters.element;
        whereStatements.push("primary_type = ? OR secondary_type = ?");
        queryParameters.push(elementType);
        queryParameters.push(elementType);

    }

    // if (typeof parameters.position !== 'undefined' && parameters.position !== 0) {
        //     const positionType = parameters.position;
        //     whereStatements.push("position_id BETWEEN ? AND ?");
        //queryParameters.push(positionType);
        //    queryParameters.push(positionType);
    //
    //}

    if (typeof parameters.Weight !== 'undefined') {
        const sortWeight = parameters.Weight;
        if (sortWeight === 'ASC') {
            orderByStatements.push('weight ASC');
        } else if (sortWeight === 'DESC') {
            orderByStatements.push('weight DESC')
        }
    }
    //Dynamically add WHERE expressions to SELECT statements if needed
    if (whereStatements.length > 0) {
        selectSql = selectSql + ' WHERE ' + whereStatements.join(' AND ');
    }

    //Dynamically add ORDER BY expressions to SELECT statements if needed
    if (orderByStatements.length > 0) {
        selectSql = selectSql + ' ORDER BY ' + orderByStatements.join(', ');
    }
    //Dynamically add ORDER BY expressions to SELECT statements if needed
    if (typeof parameters.limit !== 'undefined' && parameters.limit > 0 && parameters.limit < 23) {
        selectSql = selectSql + ' LIMIT ' + parameters.limit;
    }
    return await connection.query(selectSql, queryParameters);
}
//PART 2 of 5 (SELECT:id)
async function getById(id){
    let identitySql = 'SELECT * FROM create_a_team_prototype WHERE id = ?'
    let queryParameters = [id]
    return await connection.query(identitySql, queryParameters);
}
//PART 3 of 5 (INSERT)
async function insertPokemon(parameters = {}) {
    const insertSql = 'INSERT INTO create_a_team_prototype (name, image_urls, height, weight, primary_type, secondary_type, position_id) VALUES(?, ?, ?, ?, ?, ?, ?)'
    let queryParameters = [
        parameters.name,
        parameters.image_urls,
        parameters.height,
        parameters.weight,
        parameters.primary_type,
        parameters.secondary_type,
        parameters.position
    ];
    return await connection.query(insertSql, queryParameters);
}

//PART 4 of 5 (UPDATE)
async function updatePokemon(id, parameters = {}) {
    const updateSql = 'UPDATE create_a_team_prototype SET name=?, image_urls=?, height=?, weight=?, primary_type=?, secondary_type=?, position_id=? WHERE id = ?'
    let queryParameters = [
        parameters.name,
        parameters.image_urls,
        parameters.height,
        parameters.weight,
        parameters.primary_type,
        parameters.secondary_type,
        parameters.position,
        id
        
    ];
    return await connection.query(updateSql, queryParameters);
}
//PART 5 of 5 (DELETE)
async function deletePokemon(id) {
    const deleteSql = 'DELETE FROM create_a_team_prototype WHERE id = ?'
    let queryParameters = [id]
    return await connection.query(deleteSql, queryParameters);
}

module.exports = {
    getAllPokemon,
    getById, 
    insertPokemon,
    updatePokemon,
    deletePokemon,
    
   
}
