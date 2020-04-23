import React, { useRef } from 'react';

interface InputProps {
    handleAdd: Function
}

const TodoInput: React.FC<InputProps> = (props) => {

    const textRef = useRef<HTMLInputElement>(null);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const inputText = textRef.current?.value;
        props.handleAdd(inputText);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="todo-text">Todo</label>
                <input type="text" id="todo-text" ref={textRef} />
            </div>
            <button type="submit">Add</button>
        </form>
    )
}

export default TodoInput;