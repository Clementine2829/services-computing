const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');


//use middleware to allow for cross-domain
app.use(cors());
//use middleware to handle the bodyParse
app.use(bodyParser.json());


//Import Routes
const postRoute = require('./routes/posts');

//use middleware to handle the routses
app.use('/posts', postRoute);


app.get('/', (req, res) => {
    res.send("Hello world, welcome  back");
})

//connect   to db
mongoose.connect(process.env.DB_CONNECTION,
    () => console.log("Connected to DB"));

app.listen(3000, () => console.log("Server running on port 3000"));

// rijIaXrF7mAFGUGL