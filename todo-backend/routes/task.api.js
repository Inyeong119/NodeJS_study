const express = require('express')
const taskController = require('../controller/task.controller');
const authController = require('../controller/auth.controller');
const router = express.Router()

// 모든 task 라우트에 인증 미들웨어 적용
router.use(authController.authenticate);

router.post('/', taskController.createTask);

router.get('/', taskController.getTask);

router.put('/:id', taskController.modifyTask);

router.delete('/:id', taskController.deleteTask);

module.exports = router;