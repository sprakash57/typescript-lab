"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_1 = require("../model/todo");
let TODOS = [];
exports.getTodos = (req, res, next) => {
    res.json({ message: 'All todos', status: '200', data: TODOS });
};
exports.createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Date.now().toString(), text);
    TODOS.push(newTodo);
    res.json({ message: "Added", status: "201", data: newTodo });
};
exports.deleteTodo = (req, res, next) => {
    const id = req.params.id;
    const deletedTodo = TODOS.find(t => t.id === id);
    const updatedTodos = TODOS.filter(t => t.id !== id);
    TODOS = [...updatedTodos];
    res.json({ message: 'deleted', status: '201', data: deletedTodo });
};
exports.udpateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const index = TODOS.findIndex(t => t.id === todoId);
    if (index > -1) {
        TODOS[index].text = updatedText;
        res.json({ message: 'updated', status: '201', data: TODOS[index] });
    }
    else {
        throw new Error('Request id does not exist');
    }
};
