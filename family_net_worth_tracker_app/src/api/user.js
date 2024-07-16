const bcrypt = require("bcrypt");
const {getUserByUsername} = require("../../../queries");

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

                apiCreateUser(todayDate, username, hashedPassword, (error, results) => {
                    if (error) {
                        response.status(500).send(error.message);
                        return;
                    }
                    response.status(201).send(`User added with username: ${results.rows[0].username}`);
                })
            });
        }
    });
}

module.exports = {
    createUser: apiCreateUser
}