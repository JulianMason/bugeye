const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');

// User model
const User = require('../models/User');
const passport = require('passport');

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register Handle
router.post('/register', (req, res) => {
    const { name, email, password, password2, userType } = req.body;

    let errors = [];

    // Check required fields
    if(!name || !email || !password || !password2 || !userType){
        errors.push({ msg: 'Please fill in all fields'})
    }

    // Check if passwords match
    if(password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    // Check password length
    if(password.length < 12) {
        errors.push({ msg: 'Password should be at least 12 characters long' });
    }

    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2,
            userType
        })
    } else {
        // Passed Validation
        User.findOne({ email: email })
            .then(user => {
                if(user) {
                    // User exists
                    errors.push({ msg: 'Email already registered' });
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2,
                        userType
                    })
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password,
                        userType
                    });

                    // Hash Password
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) =>{
                        if(err) throw err;
                        // Sets password to hash
                        newUser.password = hash;

                        // Save user
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'Registration successful! Login to continue')
                                res.redirect('/auth/login')
                                return;
                            })
                            .catch(err => console.log(err));
                    }))
                }
            })
    }
});

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/auth/login');
})

module.exports = router;