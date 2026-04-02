import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react'

import todoIcon from '../../assets/icons/todo-icon.png';

import './styles.css';

interface Todo {
  id: number;
  text: string;
}

export const TodoList: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleInputValueChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }, []);

  const handleTodoAdd = useCallback((event: React.SubmitEvent<HTMLFormElement>) => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
      };

      setTodos(prevValue => [...prevValue, newTodo]);

      setInputValue('');

      event.preventDefault();
    }
  }, [inputValue]);

  const handleTodoRemove = useCallback((id: number) => {
    setTodos(prevValue => prevValue.filter(todo => todo.id !== id));
  }, []);

  return (
    <div className="todo-list">
      <img className="todo-icon" src={todoIcon} alt="Todo icon" />
      <div className="container">
        <form className="form" onSubmit={handleTodoAdd}>
          <input
            className="input"
            name="inputValue"
            value={inputValue}
            onChange={handleInputValueChange}
            placeholder="Enter Task"
          />
          <button className="button" type="submit">Add</button>
        </form>
        <ul className="todos">
          <AnimatePresence initial={false}>
            {todos.map(todo => (
              <motion.li
                className="todo-item"
                key={todo.id}
                onClick={() => handleTodoRemove(todo.id)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                {todo.text}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  )
};
