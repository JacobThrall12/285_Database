//library
//npm install library for below 
const mysql = require('mysql2/promise');
//database connection 
let connection = null;
async function query(sql, params) {
    //Singleton DB connection
    if (null === connection) {
        console.log('Here');
        connection = await mysql.createConnection({
            host: "student-databases.cvode4s4cwrc.us-west-2.rds.amazonaws.com",
            user: "JACOBTHRALL",
            password: "tekR7ZhRqBVxcOx1YObSH44kyFJYkJiLpEE",
            database: 'JACOBTHRALL'
        });
    }

    const [results,] = await connection.execute(sql, params);


    return results;
}


module.exports = {
    query
}



