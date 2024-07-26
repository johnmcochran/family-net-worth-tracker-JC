const bcrypt = require("bcrypt");
const {hash} = require("bcrypt"); //node-postgres package
const {getUserByUsername, createUser: dbCreateUser} = require("../../db/user");

const apiCreateUser = (request, response) => {
    const { username, password } = request.body;
    const todayDate = new Date().toLocaleDateString();

    getUserByUsername(username, (err, users) => {
        if (err) {
            response.status(500).send(err.message);
            return;
        }

        if (users.length > 0) {
            response.status(400).send(`User with username: ${username} already exists`);
        } else {
            // Generate salt and hash the password
            const saltRounds = 10; // You can adjust the cost factor (higher is more secure but slower)
            bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
                if (err) {
                    response.status(500).send(err.message);
                    return;
                }

                dbCreateUser(todayDate, username, hashedPassword, (error, results) => {
                    if (error) {
                        response.status(500).send(error.message);
                        return;
                    }
                    response.status(201).send(`User added with username: ${results.rows[0].username}`);
                })
            });
        }
    });
};

const apiVerifyUser = (request, response) => {
  const { username, password } = request.body;

  console.log(`Received login request for username: ${username}`);

  getUserByUsername(username, (err, users) => {
      if (err) {
          response.status(500).send(err.message);
          return;
      }
      if (users.length < 1) {
        console.log('Invalid username.')  
        response.status(401).send('Invalid credentials.');
          return;
      }
      const user = users[0];
      // Compare the entered password with the stored hashed password
      verifyPassword(password, user, response);
  });
};

module.exports = {
    apiCreateUser,
    apiVerifyUser
}

function verifyPassword(password, user, response) {
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
            console.log('match? ' + isMatch)
            console.log(password)
            console.log(user.password)
            console.log('Invalid password');
            response.status(401).send('Invalid credentials');
        }
    });
}
