const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Import routes
const authRoute = require('./routes/auth');
const jobsRoute = require('./routes/jobs');
const companiesRoute = require('./routes/companies');

dotenv.config();

//connect to db
mongoose.connect(
    process.env.DB_CONNECT,
    (err) => console.log("Connected to db " + ((err != null) ? err.message : "successfully")));

//Midlleware
app.use(express.json());


// Route middleware
app.use('/v1/user', authRoute);
app.use('/v1/jobs', jobsRoute);
app.use('/v1/companies', companiesRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
