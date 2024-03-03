const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('dist')); // Assuming your Vue.js app is in a 'dist' folder

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});