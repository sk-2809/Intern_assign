const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Create new schema
const BlogSchema = new Schema({
    author_email : {
        type : String,
        required : true
    },
    author_name : {
        type : String ,
        required : true       
    },
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    comments :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "comment"
        }
    ],
    date_written : {
        type : Date,
        default : Date.now
    }
})

module.exports = Blog = mongoose.model('blog', BlogSchema);