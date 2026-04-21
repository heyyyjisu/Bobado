"use client";

import Navbar from "@/components/Navbar";
import { getCookie } from "cookies-next";
import { useEffect, useMemo, useState } from "react";
import { Todo } from "@/types/todo";
import CategoryCard from "@/components/CategoryCard";
import Tree from "@/components/Tree";
import { toast } from "sonner";

type Props = {
  initialTodos: Todo[];
};

const fruits = ["🍎", "🍊", "🍇", "🍋", "🍑"];

export default function TodoList({ initialTodos }: Props) {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [isAdding, setisAdding] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [fruitIndex, setFruitIndex] = useState(0);

  // get token
  const token = getCookie("token");

  // todos by category
  const important = useMemo(
    () => todos.filter((todo) => todo.category === "important"),
    [todos],
  );
  const canwait = useMemo(
    () => todos.filter((todo) => todo.category === "canwait"),
    [todos],
  );
  const deadline = useMemo(
    () => todos.filter((todo) => todo.category === "deadline"),
    [todos],
  );
  const habit = useMemo(
    () => todos.filter((todo) => todo.category === "habit"),
    [todos],
  );
  const uncategorized = useMemo(
    () => todos.filter((todo) => todo.category === "uncategorized"),
    [todos],
  );

  //todos by isCompleted === false
  const incompleteTodos = useMemo(
    () => todos.filter((todo) => !todo.isCompleted),
    [todos],
  );

  async function handleAdd() {
    if (!todo) return toast.error("Check your input ✍️");
    setisAdding(true);
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
        toast.error("Something went wrong 🫯 Try again");
        return;
      }
      const result = await res.json();
      setTodos([...todos, ...result]);
      setTodo("");
      setisAdding(false);
      toast("Fruits grew! 🌳");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong 🫯 Try again");
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
      toast("Todo deleted.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete todo 👎 Try again");
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
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, isCompleted: !checked } : todo,
        ),
      );
      toast("Todo completed! ✨");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!isAdding) return;
    const timer = setInterval(() => {
      setFruitIndex((prev) => (prev + 1) % fruits.length);
    }, 300);
    return () => clearInterval(timer);
  }, [isAdding]);

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
          placeholder={`watch your todos grow as fruits, pluck them when done! it only allows 10 todos a day, it will refresh after 24 hours. you can write in natural language if you want :)`}
        />
        <div className="flex justify-end">
          <button
            className="bg-[#CAB6A4] rounded-full px-4 py-1 text-sm flex items-center gap-2"
            onClick={() => handleAdd()}
          >
            {isAdding ? fruits[fruitIndex] : "Grow fruits!"}
          </button>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* important */}

          <CategoryCard
            title="important"
            icon="/images/important.webp"
            alt="apple"
            todos={important}
            onComplete={handleCompleted}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />

          {/* deadline */}

          <CategoryCard
            title="deadline"
            icon="/images/deadline.webp"
            alt="orange"
            todos={deadline}
            onComplete={handleCompleted}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />

          {/* can wait */}

          <CategoryCard
            title="canwait"
            icon="/images/canwait.webp"
            alt="grape"
            todos={canwait}
            onComplete={handleCompleted}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />

          {/* habit */}

          <CategoryCard
            title="habit"
            icon="/images/habit.webp"
            alt="lemon"
            todos={habit}
            onComplete={handleCompleted}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
        </div>
        {/* uncategorized */}
        <div className="mb-4">
          <CategoryCard
            title="uncategorized"
            icon="/images/uncategorized.webp"
            alt="peach"
            todos={uncategorized}
            onComplete={handleCompleted}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
        </div>
      </div>
    </div>
  );
}
