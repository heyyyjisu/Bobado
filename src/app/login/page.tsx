"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { setCookie } from "cookies-next";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  async function handleLogin() {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await res.json();
      console.log(result);
      setCookie("token", result.token);
      router.push("/todos");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div>
        <h1>Log in</h1>
        <p>Email: </p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="What is your email?"
        />
        <p>Password: </p>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="What is your password?"
        />
      </div>
      <button onClick={() => handleLogin()}>Log in</button>
      <button onClick={() => router.push("/register")}>Register now</button>
    </div>
  );
}
