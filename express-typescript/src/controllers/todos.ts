import { RequestHandler } from 'express';
import { Todo } from '../model/todo';

let TODOS: Todo[] = [];

export const getTodos: RequestHandler = (req, res, next) => {
    res.json({ message: 'All todos', status: '200', data: TODOS })
}

export const createTodo: RequestHandler = (req, res, next) => {
    const text = (req.body as { text: string }).text;
    const newTodo = new Todo(Date.now().toString(), text);
    TODOS.push(newTodo);
    res.json({ message: "Added", status: "201", data: newTodo });
}

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
    const id = req.params.id;
    const deletedTodo = TODOS.find(t => t.id === id);
    const updatedTodos = TODOS.filter(t => t.id !== id);
    TODOS = [...updatedTodos];
    res.json({ message: 'deleted', status: '201', data: deletedTodo });
}

export const udpateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = (req.body as { text: string }).text;
    const index = TODOS.findIndex(t => t.id === todoId);
    if (index > -1) {
        TODOS[index].text = updatedText;
        res.json({ message: 'updated', status: '201', data: TODOS[index] });
    } else {
        throw new Error('Request id does not exist')
    }
}
