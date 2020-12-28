const express = require('express');
const mongoose = require('mongoose');
const config = require('config')
var cors = require('cors')

const app = express()

// Passing middleware
app.use(express.json())

const db = config.get('mongoURI')

mongoose
    .connect(db, {
        useNewUrlParser : true,
        useCreateIndex : true,
        useUnifiedTopology : true
    })
    .then(() => console.log('Connected to Database...!'))
    .catch(err => console.log('Database connection error : '+err))

// Routes
app.use('/users_api', require('./routes/api/user'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/post', cors(), require('./routes/api/blog'))

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
    console.log(`Server is running on Port :`+ Port )
})