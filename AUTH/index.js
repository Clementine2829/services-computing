const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Import routes
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');

dotenv.config();

//connect to db
mongoose.connect(
    process.env.DB_CONNECT,
    (err) => console.log("Connected to db " + ((err != null) ? err.message : "successfully")));

//Midlleware
app.use(express.json());


// Route middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postsRoute);


app.listen(3000, () => console.log("Server up and runing "));
