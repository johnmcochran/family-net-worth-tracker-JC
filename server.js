const express = require('express');
const db = require('./family_net_worth_tracker_app/db/user')
const cors = require('cors');
const bodyParser = require('body-parser')
const {apiCreateUser, apiVerifyUser} = require("./family_net_worth_tracker_app/src/api/user");
const app = express();
const port = 3000;

app.use(cors()); // added this to allow using localhost:3000 from my app that's on localhost:8080
app.use(express.static('dist')); // Assuming your Vue.js app is in a 'dist' folder
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ 
  extended: true, 
  })
)


app.get('/', (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API"})
});

app.post('/api/login', apiVerifyUser)
app.post('/api/createuser', apiCreateUser)



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});