const { Client } = require('pg'); //node-postgres package
const client = new Client({
    host: 'localhost',
    database: 'family_net_worth_tracker_db',
    port:5432,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    
  }) // uses environment variables for connection info
   // PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT
  
client.connect();

// add_user
const createUser = (request, response) => {
    const {username, password} = request.body
  
    client.query(
      'INSERT INTO public.users (username, password) VALUES ($1, $2) RETURNING *', [username, password], (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send('User added with username: ${results.rows[0].username}')
      }
    )
  }
  
  // get_user
  const getUserByUsername = (request, response) => {
    const username = request.params.username
  
    client.query(
      'SELECT username FROM public.users where username = $1', [username], (err, results) => {
        if (err) {
          throw error
        }
        response.status(200).json(results.rows)
      }
    )
  }
  
  module.exports = {
    createUser,
    getUserByUsername,
  }