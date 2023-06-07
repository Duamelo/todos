const express = require('express');
const { createTodo, updateTodo, deleteTodoById, getTodoById, getAllTodos } = require('../services/todo');
const router = express.Router();

router.get('/', async (req, res) => {
    const todos = await getAllTodos();

    if (!todos)
        res.status(500).json({success: false});

    return  res.status(200).send(todos);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const todo = await getTodoById(id);

    if (!todo)
        res.status(500).json({success: false});

    return  res.status(200).send(todo);
});

router.delete('/:id', async (req, res)=>{
    const id = req.params.id;

    const todo = await deleteTodoById(id);

    if (!todo)
        return res.status(404).json({message: 'the todo with that id does not exist'});
    
    return res.status(200).send({msg: "todo with id " + id + " is deleted"});
});

router.put('/:id', async (req, res)=> {
    const data = req.body;
    if (!data.title || !data.description || !data.completed)
        return res.status(400).send('Some attribute are missing');

    const todo = await updateTodo(req.params.id, data);

    if (!todo)
        return res.status(404).send('The todo with that id cannot be updated!');

    return res.status(200).send({
        msg: "todo with id " + req.params.id + " is updated",
        todo: todo
    });
});

router.post('/', async (req, res) => {

    const data = req.body;
    if (!data.title || !data.description || !data.completed)
        return res.status(400).send('Some attribute are missing');
    
    const result = await createTodo(data);

    if (!result)
        return res.status(404).send('The todo cannot be created!');

    return res.status(200).send(result);
});

module.exports = router;