const express = require('express')
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../config/auth');
const Ticket = require('../models/Ticket');

// Landing page
router.get('/', ensureGuest, (req, res) => res.render('welcome'));

// Dashboard page
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const tickets = await Ticket.find({ user: req.user.id })
    } catch (err) {

    }

    res.render('dashboard', {
        name: req.user.name,
        userType: req.user.userType
    })
})

module.exports = router;