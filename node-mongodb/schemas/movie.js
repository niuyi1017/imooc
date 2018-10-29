const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  director: String,
  title: String,
  summary: String,
  language: String,
  flash: String,
  poster: String,
  country: String,
  year: Number,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})
// 注意！！！schema中不可用ES6 箭头函数，否则 this = undefined
movieSchema.pre('save', function(next){
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }else {
    
    this.meta.updateAt = Date.now()
  }
  next()
})

movieSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({ _id: id })
      .exec(cb)
  }
}
module.exports = movieSchema