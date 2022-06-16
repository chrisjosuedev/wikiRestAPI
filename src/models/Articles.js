const { Schema, model } = require('mongoose')

const articlesSchema = new Schema({
  title: {
    type: String,
    maxlength: 30
  },
  description: {
    type: String
  }
})


module.exports = model('Articles', articlesSchema)