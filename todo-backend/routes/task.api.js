const express = require('express')
const taskController = require('../controller/task.controller');
const router = express.Router()

router.post('/',taskController.createTask);

router.get('/', taskController.getTask);

router.put('/', taskController.modifyTask);

router.delete('/', taskController.deleteTask);

module.exports = router;