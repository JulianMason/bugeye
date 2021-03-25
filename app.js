const express = require('express')
const index = require('./routes/index')
const users = require('./routes/users')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const exphbs = require('express-handlebars');
const morgan = require('morgan')
const dotenv = require('dotenv')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport');
const mongoSanitize = require('express-mongo-sanitize');


const app = express();

// Sanitize mongo scripts by replacing prohibited characters with '_'
app.use(mongoSanitize({
    replaceWith: '_'
}));

// Load config
dotenv.config();

// Passport config
require('./config/passport')(passport);

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

// Handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view gnine', '.hbs');

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// BodyParser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(session({
    secret: 'secret',
    receive: true,
    resave: false,
    saveUninitialized: true,
    cookie : {
        maxAge:(5000) // 5 seconds - maxAge works in milliseconds
} 
}));



// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

// Routes
app.use('/', index)
app.use('/auth', users)

// Listen
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}. Ctrl^c to quit.`);
});