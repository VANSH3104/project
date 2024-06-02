const express = require('express');
const { createtodo, updatetodo } = require('./tupes');
const { user } = require('./db');
const cors = require("cors")
const app = express();
app.use(cors())
app.use(express.json());
const port = 3000;

app.post('/todo', async (req, res) => {
    const createpayload = req.body;
    const parsedpayload = createtodo.safeParse(createpayload);
    if (!parsedpayload.success) {
        res.status(400).json({
            msg: 'Invalid todo data',
        });
        return;
    }
    // MongoDB
    try {
        await user.create({
            title: req.body.title,
            description: req.body.description,
            completed: false,
        });
        res.json({
            msg: 'Todo created',
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error creating todo',
            error: error.message,
        });
    }
});

app.get('/todos', async (req, res) => {
    try {
        const todos = await user.find({});
        res.json(todos);
    } catch (error) {
        res.status(500).json({
            msg: 'Error fetching todos',
            error: error.message,
        });
    }
});

app.put('/completed', async (req, res) => {
    const updatetodos = req.body;
    const parsedpayload = updatetodo.safeParse(updatetodos);
    if (!parsedpayload.success) {
        res.status(400).json({
            msg: 'Invalid update data',
        });
        return;
    }
    // Updating in MongoDB
    try {
        await user.updateOne({ _id: req.body.id }, { completed: true });
        res.json({
            msg: 'Todo updated',
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error updating todo',
            error: error.message,
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
