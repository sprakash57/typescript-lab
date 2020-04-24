import { Router } from 'express';
import { createTodo, getTodos, deleteTodo, udpateTodo } from '../controllers/todos';

const routes = Router();

routes.post('/', createTodo)

routes.get('/', getTodos);

routes.patch('/:id', udpateTodo);

routes.delete('/:id', deleteTodo);

export default routes;