const bcrypt = require('bcrypt');

const { Client } = require('pg');
const {hash} = require("bcrypt"); //node-postgres package
const client = new Client({
    host: 'localhost',
    database: 'family_net_worth_tracker_db',
    port:5432,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    
  }) // uses environment variables for connection info
   // PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT
  
client.connect();

const getUserByUsername = (username, callback) => {
  client.query(
      'SELECT username, password FROM public.users WHERE username = $1', [username], (err, results) => {
          if (err) {
              return callback(err, null);
          }
          callback(null, results.rows);
      }
  );
};

const createUser = (todayDate, username, hashedPassword, callback) => {
    client.query(
        'INSERT INTO public.users (user_joined_date, username, password) VALUES ($1, $2, $3) RETURNING *',
        [todayDate, username, hashedPassword],
        (error, results) => {
            callback(error, results)
        }
    );
};

const verifyUser = (request, response) => {
  const { username, password } = request.body;

  console.log(`Received login request for username: ${username}`);

  getUserByUsername(username, (err, users) => {
      if (err) {
          response.status(500).send(err.message);
          return;
      }

      if (users.length === 0) {
          response.status(401).send('Invalid credentials');
          return;
      }

      const user = users[0];

      // Compare the entered password with the stored hashed password
      bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            console.error('Error comparing passwords:', err);  
            response.status(500).send(err.message);
              return;
          }

          if (isMatch) {
            console.log('Password match, login successful');  
            response.status(200).send('Login successful');
          } else {
            console.log('Invalid credentials');  
            response.status(401).send('Invalid credentials');
          }
      });
  });
};

module.exports = {
  createUser,
  getUserByUsername,
  verifyUser
}