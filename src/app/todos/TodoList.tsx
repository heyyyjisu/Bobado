"use client";

import Navbar from "@/components/Navbar";
import { getCookie } from "cookies-next";
import { useState } from "react";

type Todo = {
  text: string;
  _id: string;
  date: Date;
  isCompleted: boolean;
  category: string;
  recurring: boolean;
  deadline: Date | null;
};

type Props = {
  initialTodos: Todo[];
};

export default function TodoList({ initialTodos }: Props) {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  // get token
  const token = getCookie("token");

  // todos by category
  const important = todos.filter((todo) => todo.category === "important");
  const canwait = todos.filter((todo) => todo.category === "canwait");
  const deadline = todos.filter((todo) => todo.category === "deadline");
  const habit = todos.filter((todo) => todo.category === "habit");
  const uncategorized = todos.filter(
    (todo) => todo.category === "uncategorized",
  );

  async function handleAdd() {
    try {
      const res = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: todo }),
      });
      const result = await res.json();
      setTodos([...todos, result]);
      setTodo("");
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCompleted(id: string, checked: boolean) {
    try {
      const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isCompleted: !checked }),
      });
      const result = await res.json();
      console.log(result);
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, isCompleted: !checked } : todo,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Navbar />
      <div>
        <h1>Add todo</h1>
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="text...?"
        />
        <button onClick={() => handleAdd()}>Add</button>
      </div>
      <div>
        {/* important */}
        <h1>Important</h1>
        {important.map((todo: Todo) => (
          <li key={todo._id}>
            {todo.text} {new Date(todo.date).toISOString().split("T")[0]}
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => handleCompleted(todo._id, todo.isCompleted)}
            />
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </li>
        ))}
        {/* can wait */}
        <h1>Can wait</h1>
        {canwait.map((todo: Todo) => (
          <li key={todo._id}>
            {todo.text} {new Date(todo.date).toISOString().split("T")[0]}
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => handleCompleted(todo._id, todo.isCompleted)}
            />
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </li>
        ))}
        {/* deadline */}
        <h1>Deadline</h1>
        {deadline.map((todo: Todo) => (
          <li key={todo._id}>
            {todo.text} {new Date(todo.date).toISOString().split("T")[0]}
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => handleCompleted(todo._id, todo.isCompleted)}
            />
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </li>
        ))}
        {/* habit */}
        <h1>Habit</h1>
        {habit.map((todo: Todo) => (
          <li key={todo._id}>
            {todo.text} {new Date(todo.date).toISOString().split("T")[0]}
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => handleCompleted(todo._id, todo.isCompleted)}
            />
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </li>
        ))}
        {/* uncategorized */}
        <h1>uncategorized</h1>
        {uncategorized.map((todo: Todo) => (
          <li key={todo._id}>
            {todo.text} {new Date(todo.date).toISOString().split("T")[0]}
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => handleCompleted(todo._id, todo.isCompleted)}
            />
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </li>
        ))}
      </div>
    </div>
  );
}
