import React, { useState } from 'react';
import TodoList from './component/TodoList';
import TodoInput from './component/TodoInput';
import { Todo } from './todo.model';

type Todos = Todo[]

const App: React.FunctionComponent = () => {
  const [todos, setTodos] = useState<Todos>([]);

  const onAdd = (text: string) => {
    setTodos([...todos, { id: Date.now().toString(), text }])
  }

  const onDelete = (todo: Todo) => {
    const newList = todos.filter(t => t.id !== todo.id);
    setTodos(newList);
  }

  return (
    <div className="App">
      <TodoInput handleAdd={onAdd} />
      <TodoList items={todos} handleDelete={onDelete} />
    </div>
  );
}

export default App;
