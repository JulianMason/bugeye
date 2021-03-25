const express = require('express')
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../config/auth');
const Story = require('../models/Ticket');

// Landing page
router.get('/', ensureGuest, (req, res) => res.render('welcome'));

// Dashboard page
router.get('/dashboard', ensureAuth, (req, res) => 
    res.render('dashboard', {
        name: req.user.name,
        userType: req.user.userType
    }));

module.exports = router;