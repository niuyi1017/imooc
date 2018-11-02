const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10
const userSchema = new mongoose.Schema({
  name: {
    unique: true,
    type: String
  },
  password: String,
  
//Role:
  // 0: nomal user
  // 1: verified user
  // 2: professonal user
  // 3-9:
  // > 10: admin
  // > 50: super admin

  role: {
    type: Number,
    default: 0
  },
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
// 注意！！！schema中不可用 ES6箭头函数 ，否则 this = undefined
userSchema.pre('save', function (next) {
  let user = this
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err)
    }
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err)
      }
      user.password = hash
      next()
    })
  })
  //next()
})

userSchema.methods = {
  comparePassword: function (_password, cb) {
    bcrypt.compare(_password, this.password, function (err, isMath) {
      if (err) {
        return cb(err)
      }
      cb(null, isMath)
    })
  }
}

userSchema.statics = {
  fetch: function (cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function (id, cb) {
    return this
      .findOne({ _id: id })
      .exec(cb)
  }
}
module.exports = userSchema