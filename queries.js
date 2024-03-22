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
  const getUserById = (request, response) => {
    const username = parseInt(request.params.username)
  
    client.query(
      'SELECT * FROM public.users where username = $1', [username], (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      }
    )
  }
  
  module.exports = {
    createUser,
    getUserById,
  }