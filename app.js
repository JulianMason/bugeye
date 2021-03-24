const express = require('express')
const index = require('./routes/index')
const users = require('./routes/users')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const dotenv = require('dotenv')


const app = express();

// Load config
dotenv.config();

// DB config
const db = require('./config/keys').MongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

// Logs
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// BodyParser
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', index)
app.use('/auth', users)

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}. Ctrl^c to quit.`);
});