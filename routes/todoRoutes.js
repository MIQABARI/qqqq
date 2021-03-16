const { Router, request, response } = require('express')
const Todo = require('../models/TodoModel')
const router = Router()

router.get('/',async(request,response) =>{
    const todoData = await Todo.find({}).lean()

    response.render('index',{
        pageTitle: 'Todo application | WELCOME',
        isIndex: true,
        todoData: todoData
    })
})

router.get('/create',(request,response) =>{
    response.render('create',{
        pageTitle: 'Create todo in MongoDB',
        isCreate: true
    })
})

router.post('/',async (request,response)=>{
    const todo = new Todo({
        title: request.body.title
    })

    await todo.save()
})

module.exports = router