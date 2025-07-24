const taskController = {};
const Task = require('../model/Task');

taskController.createTask= async (req,res)=>{
  try{
    const { task, isComplete} = req.body;
    const newTask = new Task({task , isComplete});
    await newTask.save();
    res.status(200).json({status:'ok',data:newTask});
  } catch (err) {
    res.status(400).json({status:'fail',error: err});
  };
};

taskController.getTask= async (req,res)=>{

  try{
    const taskList = await Task.find({}).select("-__v");
    res.status(200).json({status:'ok',data: taskList});
  } catch (err) {
    res.status(400).json({status:'fail',error: err});
  }
};

//과제1: 메모의 상태를 수정할 수 있다.

taskController.modifyTask = async (req, res) => {
  try {
    const { id, isComplete } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,{ isComplete },{ new: true }
    ).select('-__v');
    if (!updatedTask) {
      return res.status(404).json({ status: 'fail', error: '해당 메모를 찾을 수 없습니다.' });
    }
    res.status(200).json({ status: 'ok', data: updatedTask });
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err });
  }
};

//과제2: 메모를 삭제할 수 있다.

taskController.deleteTask = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedTask = await Task.findByIdAndDelete(id).select('-__v');
    if (!deletedTask) {
      return res.status(404).json({ status: 'fail', error: '해당 메모를 찾을 수 없습니다.' });
    }
    res.status(200).json({ status: 'ok', data: deletedTask });
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err });
  }
};

module.exports = taskController;