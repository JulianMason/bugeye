const express = require('express')
const router = express.Router();
const { ensureAuth } = require('../config/auth');
const Ticket = require('../models/Ticket');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const DOMPurify = createDomPurify(new JSDOM().window);

// Show add page
router.get('/add', ensureAuth, (req, res) => {
    res.render('tickets/add.hbs');
})

router.get('/:id', ensureAuth, async (req, res) => {
    const ticket = await Ticket.findOne({
        _id: req.params.id
    }).lean();
    if(!ticket) {
        return res.render('../views/error/400.hbs');
    } else {
        res.render('../views/tickets/ticket.hbs', {
            ticket
        });
    }
})

// Post ticket
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = DOMPurify.sanitize(req.body.user);
        req.body.user = req.user.id
        await Ticket.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        res.render('error/500.hbs')
    }
})



module.exports = router;