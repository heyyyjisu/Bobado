"use client";

import { Todo } from "@/types/todo";

type Card = {
  title: string;
  icon: string;
  todos: Todo[];
  onComplete: (id: string, checked: boolean) => void;
  onDelete: (id: string) => void;
};

export default function CategoryCard({
  title,
  icon,
  todos,
  onComplete,
  onDelete,
}: Card) {
  return (
    <div className="bg-[#f5ede6] rounded-2xl p-3 shadow-sm">
      {/* header */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <img className="w-6 h-6" src={icon} />
        <span className="text-sm font-bold">{title}</span>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex items-center gap-2 py-1 text-sm list-none"
          >
            <div
              onClick={() => onComplete(todo._id, todo.isCompleted)}
              className={`w-4 h-4 shrink-0 rounded-full border border-[#CAB6A4] cursor-pointer flex items-center justify-center ${todo.isCompleted ? "bg-[#CAB6A4]" : "bg-transparent"}`}
            >
              {todo.isCompleted && (
                <span className="text-white text-xs">✓</span>
              )}
            </div>
            <span className={todo.isCompleted ? "line-through opacity-50" : ""}>
              {todo.text}
            </span>
            <button
              onClick={() => onDelete(todo._id)}
              className="flex items-center justify-center ml-auto text-xs w-4 h-4 shrink-0 rounded-full border border-[#CAB6A4] cursor-pointer"
            >
              ✘
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
