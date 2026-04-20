"use client";

import Navbar from "@/components/Navbar";
import { getCookie } from "cookies-next";
import { useState } from "react";
import { Todo } from "@/types/todo";
import CategoryCard from "@/components/CategoryCard";
import Tree from "@/components/Tree";

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

  //todos by isCompleted === false
  const incompleteTodos = todos.filter((todo) => !todo.isCompleted);

  async function handleAdd() {
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: todo }),
      });
      if (!res.ok) {
        console.error("Ai error");
        return;
      }
      const result = await res.json();
      setTodos([...todos, ...result]);
      setTodo("");
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/todos/${id}`, {
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
      const res = await fetch(`/api/todos/${id}`, {
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
    <div className="w-full max-w-md mx-auto px-4 py-6">
      <Navbar />
      <div className="flex justify-center mb-4">
        <Tree incompleteTodos={incompleteTodos} />
      </div>
      <div className="bg-[#F0E8E0] rounded-2xl p-4 mb-4 shadow-sm">
        <textarea
          className="w-full bg-transparent resize-none outline-none text-sm mb-4"
          style={{ fontFamily: "var(--font-crafty-girls)" }}
          rows={4}
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder={`watch your todos grow as fruits, pluck them when done! it only allows 10 todos a day, it will refresh after 24 hours.`}
        />
        <div className="flex justify-end">
          <button
            className="bg-[#CAB6A4] rounded-full px-4 py-1 text-sm"
            onClick={() => handleAdd()}
          >
            Grow fruits
          </button>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* important */}

          <CategoryCard
            title="important"
            icon="/images/important.png"
            todos={important}
            onComplete={handleCompleted}
            onDelete={handleDelete}
          />

          {/* deadline */}

          <CategoryCard
            title="deadline"
            icon="/images/deadline.png"
            todos={deadline}
            onComplete={handleCompleted}
            onDelete={handleDelete}
          />

          {/* can wait */}

          <CategoryCard
            title="canwait"
            icon="/images/canwait.png"
            todos={canwait}
            onComplete={handleCompleted}
            onDelete={handleDelete}
          />

          {/* habit */}

          <CategoryCard
            title="habit"
            icon="/images/habit.png"
            todos={habit}
            onComplete={handleCompleted}
            onDelete={handleDelete}
          />
        </div>
        {/* uncategorized */}
        <div className="mb-4">
          <CategoryCard
            title="uncategorized"
            icon="/images/uncategorized.png"
            todos={uncategorized}
            onComplete={handleCompleted}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
