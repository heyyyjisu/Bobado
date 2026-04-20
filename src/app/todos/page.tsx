import { cookies } from "next/headers";
import TodoList from "./TodoList";

export default async function Todos() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token}`,
    },
  });
  const todos = await res.json();
  console.log(todos);
  const todoList = Array.isArray(todos) ? todos : [];

  return (
    <div>
      <TodoList initialTodos={todoList} />
    </div>
  );
}
