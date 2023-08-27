const mongoose = require('mongoose')

const task = mongoose.Schema({
   taskname: {
      type: String,
      require: true
   },
   description: {
      type: String,
      require: true
   },
   taskstatus: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending'
   }

}, { timestamps: true })

module.exports = mongoose.model('todo', task)
