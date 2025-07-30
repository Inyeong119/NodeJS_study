const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = Schema({
  task:{
    type:String,
    required:true
  },
  isComplete:{
    type:Boolean,
    required:true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},
{timestamps : true});

const Task = mongoose.model("Task",taskSchema);

module.exports = Task;