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

movieSchema.pre('save', function(next){
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }else {
    // console.log(this.meta)
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