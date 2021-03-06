const mongoose = require('mongoose');
const { nanoid } = require('nanoid')

const CommentSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => nanoid(12)
    },
    user: {
        type: String,
        ref: 'User._id'
    },
    created_by: {
        type: String
    },
    comment: {
        type: String,
        //required: true
    },
    comment_timestamp: {
        type: Date,
        default: Date.now
    },
    ticket_id: {
        type: String
    }
})
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;

