const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const express = require('express')
const router = express.Router()

// Blog model
const Blog = require('../../models/blog')
const comment = require('../../models/comment')


router.post('/',(req, res) => {
    const newBlog = new Blog({
        author_name : req.body.author_name,
        author_email : req.body.author_email,
        title : req.body.title,
        content : req.body.content,
        comment : req.body.comment,
    })
    newBlog.save().then((blog) => res.json(blog))
})

router.get('/', (req, res) => {
    Blog
        // .sort({date:-1})
        .find(function(err, blog) {
            if(err){
                console.log(err);
            }else{
                res.json(blog);
            }
        })
        
        // .then((blog) => res.json(blog))
})

module.exports = router;