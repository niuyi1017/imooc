const mongoose = require('mongoose')
const commentSchema = require('../schemas/comment')
const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
