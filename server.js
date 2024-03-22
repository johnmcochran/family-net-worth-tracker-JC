const express = require('express');
const db = require('./queries')
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

app.use(express.static('dist')); // Assuming your Vue.js app is in a 'dist' folder
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ 
  extended: true, 
  })
)


app.get('/', (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API"})
});

app.get('/users/:username', db.getUserByUsername)
app.post('/users', db.createUser)




app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});