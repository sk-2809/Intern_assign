const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Create new schema
const CommentSchema = new Schema({
    content : {
        type : String,
        required : true
    },
    blog : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "blog"
    }
})

module.exports = Comment = mongoose.model('comment', CommentSchema);