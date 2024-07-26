const { Client } = require('pg');
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

module.exports = {
  createUser,
  getUserByUsername
}