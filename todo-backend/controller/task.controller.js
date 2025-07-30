const taskController = {};
const Task = require('../model/Task');

taskController.createTask= async (req,res)=>{
  try{
    const { task, isComplete} = req.body;
    
    // req.user가 없으면 에러 반환
    if (!req.user || !req.user._id) {
      console.log("User not found in request");
      return res.status(401).json({status:'fail', error: '사용자 정보가 없습니다.'});
    }
    
    const author = req.user._id;
    console.log("Author ID:", author);
    const newTask = new Task({task , isComplete, author});
    await newTask.save();
    console.log("Task saved with author:", author);
    res.status(200).json({status:'ok',data:newTask});
  } catch (err) {
    console.log("Error in createTask:", err);
    res.status(400).json({status:'fail',error: err});
  };
};

taskController.getTask= async (req,res)=>{

  try{
    const taskList = await Task.find({}).populate('author', 'username').select("-__v");
    res.status(200).json({status:'ok',data: taskList});
  } catch (err) {
    res.status(400).json({status:'fail',error: err});
  }
};

//과제1: 메모의 상태를 수정할 수 있다.

taskController.modifyTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { isComplete } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,{ isComplete },{ new : true }
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
    const { id } = req.params;
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