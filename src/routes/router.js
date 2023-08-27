const express = require('express')
const Router = express.Router()
const usercontroller = require('../controller/userController')
const taskController = require('../controller/taskController')
const { Authentication } = require('../middleware/middleware')

//-----------------------------------User API----------------------------------------------------------------------//
Router.post('/user', usercontroller.createUser)
Router.post('/login', usercontroller.login)

//------------------------------------TODO API---------------------------------------------------------------------//
Router.post('/task', Authentication, taskController.createTodo)
Router.get('/todolist', Authentication, taskController.getTodoList)
Router.get('/task/:Id', Authentication, taskController.getToDoById)
Router.put('/task/:Id', Authentication, taskController.updateTodo)
Router.delete('/task/:Id', Authentication, taskController.deleteTodo)

//----------------------------------------Invalid Path Handled------------------------------------------------------//
Router.all('/*', (req, res) => {
   res.status(404).send({ status: false, message: 'Invalid URL path, Path Not Found' });
})

//------------------------------------------------------------------------------------------------------------------//

module.exports = Router;