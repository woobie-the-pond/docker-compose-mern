const mongoose = require('mongoose')
const { Schema } = mongoose

const User = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('users', User)
