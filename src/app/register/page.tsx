"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const router = useRouter();

  async function handleRegister(e: React.MouseEvent) {
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div>
        <div>
          <h1>Register</h1>
          <p>Name: </p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="What is your name?"
          />
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
            minLength={8}
            placeholder="What is your password?"
          />
          <p>Confirm password: </p>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm your password"
          />
          {password !== confirmPassword ? (
            <p className="text-red-600">Password not match</p>
          ) : (
            ""
          )}
        </div>
        <button onClick={(e) => handleRegister(e)}>Register now</button>
        <button onClick={() => router.push("/login")}>Back to log in</button>
      </div>
    </div>
  );
}
