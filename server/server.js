require('./config/config');

const express = require('express');
const path = require('path');

const port = process.env.PORT;

var app = express();

// serve static files
app.use(express.static(path.join(__dirname,'../public')));


app.listen(port, (err) => {
  if (err) {
    console.log("whoops something went wrong", err);
  } else {
    console.log(`Server up on port ${port}`)
  }
})
