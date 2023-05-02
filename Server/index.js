//Libraries
const express = require('express');
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const mysql = require('mysql2');
const cors = require('cors'); //Needed for PUT HTTP method
const pokemon = require('./Model/pokemon');

//Setup defaults for script
const app = express();
app.use(cors());
app.use(express.static('public'))
const upload = multer()
const port = 80 //Default port to http server

const connection = mysql.createConnection({
  host: "student-databases.cvode4s4cwrc.us-west-2.rds.amazonaws.com",
  user: "JACOBTHRALL",
  password: "tekR7ZhRqBVxcOx1YObSH44kyFJYkJiLpEE",
  database: 'JACOBTHRALL'
});
// Middleware to validate fields
const validateFields = [
  check('name', 'Please enter the name of the Pokemon.').isLength({ min: 1, max: 255 }),
  check('position', 'Please enter the position the Pokemon will play.').isIn(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16']),
  check('height', 'Please enter the height of the Pokemon.').isFloat({ min: 3, max: 66 }),
  check('weight', 'Please enter the weight of the Pokemon.').isFloat({ min: 0.1, max: 2205 }),
  check('primary_type', 'Please choose Type 1.').isIn(['Bug', 'Dark', 'Dragon', 'Electric', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Water', 'Rock', 'Steel']),
  check('secondary_type', 'Please choose Type 2.').isIn(['None', 'Bug', 'Dark', 'Dragon', 'Electric', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Water', 'Rock', 'Steel'])
];
//PART 1 of 5 (SELECT) 
app.get('/pokemon/', upload.none(),
  async (request, response) => {
    let result = {};
    try {
      result = await pokemon.getAllPokemon(request.query);
    } catch (error) {
      return response
        .status(500) //Error code when something goes wrong with the server
        .json({ message: 'Something went wrong with the server.' });

    }
    //Default response object
    response
      .json({ 'data': result });
  });
//PART 2 of 5 (SELECT:id)
app.get('/pokemon/:id', upload.none(),
async (request, response) => {
  let result = {};
  try {
    result = await pokemon.getById(request.params.id, request.body);
    
  } catch (error) {
    return response
      .status(500) //Error code when something goes wrong with the server
      .json({ message: 'Caint see shiet' });
  }
  response
    .json({ 'data': result });
});
//PART 3 of 5 (INSERT)
app.post('/pokemon/', upload.none(), validateFields, async (request, response) => {
  const errors = validationResult(request)
  if (!errors.isEmpty()) {
    return response
      .status(400)
      .json({
        message: 'Request fields or files are invalid.',
        errors: errors.array(),
      });
  }
  try {
    await pokemon.insertPokemon(request.body);
    return response
      .json({ message: 'OK' });

  }
  catch (error) {
    //If there are any errors, then we run this block of code
    return response
      .status(500) //Error code when something goes wrong with the server
      
      .json({ message: 'Something went wrong with the server.' });
  }
});
//PART 4 of 5 (UPDATE)
app.put('/pokemon/:id/', upload.none(), validateFields, async (request, response) => {
  const errors = validationResult(request)
  if (!errors.isEmpty()) {
    return response
      .status(400)
      .json({
        message: 'Request fields or files are invalid.',
        errors: errors.array(),
      });
  }
  let result = {};
  try {
    //Was literally missing the request.body
    result = await pokemon.updatePokemon(request.params.id, request.body);
  }catch (error) {
    //If there are any errors, then we run this block of code
    return response
      .status(500) //Error code when something goes wrong with the server
      .json({ message: 'Something went wrong with the server' });
  }
});
//PART 5 of 5 (DELETE)
app.delete('/pokemon/:id/', upload.none(), async (request, response) => {
  const errors = validationResult(request)
  if (!errors.isEmpty()) {
    return response
      .status(400)
      .json({
        message: 'Request fields or files are invalid.',
        errors: errors.array(),
      });
  }
  try {
    await pokemon.deletePokemon(request.params.id, request.body);
    return response
      .json({ message: 'OK' });

  }
  catch (error) {
    //If there are any errors, then we run this block of code
    return response
      .status(500) //Error code when something goes wrong with the server
      
      .json({ message: 'Something went wrong with the server.' });
  }
});
app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`);
});