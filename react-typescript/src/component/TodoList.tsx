import React from 'react';
import { Todo } from '../todo.model';


interface TodoListProps {
    items: Todo[],
    handleDelete: Function
}

const TodoList: React.FC<TodoListProps> = (props) => {
    const handleClick = (todo: Todo) => () => {
        props.handleDelete(todo)
    }
    return (
        <ul>
            {props.items.map(todo => (
                <li key={todo.id}>
                    <span>{todo.text}</span>
                    <button onClick={handleClick(todo)}>Delete</button>
                </li>
            ))}
        </ul>
    )
}

export default TodoList;
