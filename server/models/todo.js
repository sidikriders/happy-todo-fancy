const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var todoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  isDone: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  doneTarget: {
    type: Date
  },
  userId: {
    type: String,
    required: true
  }
})

var Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo;
