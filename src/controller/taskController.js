const { isValidObjectId } = require('mongoose')
const { validstrdigit } = require('../validations/validators')
const taskModel = require('../model/taskModel')

//--------------------------------------------- Create Todo -------------------------------------------------------------------------------//
const createTodo = async (req, res) => {
    try {
        const { taskname, description } = req.body

        //heres,Ensuring there must be required data filled in json body
        if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, message: 'Enter Required Data' })

        //validating taskname, it should be string or digit
        if (!taskname) return res.status(400).send({ status: false, message: 'Enter Taskname' })
        if (!validstrdigit(taskname)) return res.status(400).send({ status: false, message: 'Enter Valid Taskname,and it should be Number or Letter' })
        if (!description) return res.status(400).send({ status: false, message: 'Enter description' })

        let create = await taskModel.create(req.body)
        return res.status(201).send({ status: true, message: 'Task Created', data: create })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//---------------------------------------------get Todo List -------------------------------------------------------------------------------//
const getTodoList = async (req, res) => {
    try {
        //getting tasks by just simply using find function
        const todolist = await taskModel.find()
        //handling situation for no task
        if (todolist.length == 0) return res.status(404).send({ status: false, message: 'No Task found' })
        return res.status(200).send({ status: true, message: 'Task List', data: todolist })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//---------------------------------------------get Todo By Id -------------------------------------------------------------------------------//
const getToDoById = async (req, res) => {
    try {
        const Id = req.params.Id;
        //checking Valid object Id 
        if (!isValidObjectId(Id)) return res.status(400).send({ status: false, message: 'Enter Valid Id' })
        const getTaskById = await taskModel.findById({ _id: Id })
        if (!getTaskById) return res.status(404).send({ status: false, message: 'Task Id is Not Found' })
        return res.status(200).send({ status: true, message: 'TaskDetails:', data: getTaskById })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//---------------------------------------------Update Taks -------------------------------------------------------------------------------//
const updateTodo = async (req, res) => {
    try {
        const Id = req.params.Id
        //checking for valid  object id
        if (!isValidObjectId(Id)) return res.status(400).send({ status: false, message: 'Enter Valid Id' })
        
        //here checking wheather taskId is Available or not
        let existid = await taskModel.findById({ _id: Id })
        if (!existid) return res.status(404).send({ status: false, message: 'Task Id is Not Found' })

        //making sure data should be present to do some update
        const data = req.body
        if (Object.keys(data).length===0) return res.status(400).send({ status: false, message: 'Enter Required Data to update' })
        const { taskname, description, taskstatus } = data

        //validating taskname, it should be string or digit
        if (!validstrdigit(taskname)) return res.status(400).send({ status: false, message: 'Enter Taskname,and it should be Number or Letter' })

        //making sure taskstatus should be a valid value
        if (taskstatus) {
            if (taskstatus !== "completed" && taskstatus !== "pending") {
                return res.status(400).send({ status: false, message: "Taskstatus can be either 'completed' or 'pending'"})
            }
        }
        let update = await taskModel.findOneAndUpdate({ _id: Id }, { $set: data }, { new: true })
        return res.status(200).send({ status: true, message: 'Task updated', data: update })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//---------------------------------------------Deleted Todo -------------------------------------------------------------------------------//
const deleteTodo = async (req, res) => {
    try {
        const Id = req.params.Id
        if (!isValidObjectId(Id)) return res.status(400).send({ status: false, message: 'Enter Valid Id' })
        const taskAvailability = await taskModel.findById(Id)
        //checking wheather taskId is already deleted or its unavailable Id
        if (!taskAvailability) return res.status(404).send({ status: false, message: 'TaskId is already deleted Or TaskId not Found' })
        //deleting Task by its Id
        const deletetask = await taskModel.findByIdAndDelete({ _id: Id })
        return res.status(200).send({ status: true, message: 'Task is deleted' })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
//--------------------------------------------------------------------------------------------------------------------------------------//

module.exports = { createTodo, getTodoList, updateTodo, getToDoById, deleteTodo }