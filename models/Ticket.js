const mongoose = require('mongoose')


const TicketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    }, 
    tType: {
        type: String,
        required: true,
        default: 'Production',
        enum: ['Development', 'Testing', 'Production']
    },
    status: {
        type: String,
        required: true,
        default: 'Open',
        enum: ['Open', 'Resolved', 'Closed']
    },
    priority: {
        type: String,
        required: true,
        default: 'High',
        enum: ['Low', 'Medium', 'High']
    },
    assignedTo: {
        type: String,
        required: true,
        default: 'Developer 1',
        enum: ['Developer 1', 'Developer 2', 'Developer 3', 'Developer 4']
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

const Ticket = mongoose.model('Ticket', TicketSchema);
module.exports = Ticket;