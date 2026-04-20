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
      const res = await fetch("/api/auth/register", {
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
    <div className="w-full max-w-md mx-auto px-4 py-6">
      <h1 className="text-4xl text-center font-normal mb-6">bobado</h1>
      <div className="bg-[#F0E8E0] rounded-2xl p-4 mb-4">
        <div>
          <h1 className="text-lg font-bold mb-3">Register</h1>
          <p>Name: </p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="What is your name?"
            className="w-full bg-transparent outline-none text-sm mb-3 border-b border-[#CAB6A4] pb-1"
          />
          <p>Email: </p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="What is your email?"
            className="w-full bg-transparent outline-none text-sm mb-3 border-b border-[#CAB6A4] pb-1"
          />
          <p>Password: </p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            minLength={8}
            placeholder="What is your password?"
            className="w-full bg-transparent outline-none text-sm mb-3 border-b border-[#CAB6A4] pb-1"
          />
          <p>Confirm password: </p>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm your password"
            className="w-full bg-transparent outline-none text-sm mb-3 border-b border-[#CAB6A4] pb-1"
          />
          {password !== confirmPassword ? (
            <p className="text-red-600">Password not match</p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => router.push("/login")}
          className="text-sm opacity-50"
        >
          Log in
        </button>
        <button
          onClick={(e) => handleRegister(e)}
          className="bg-[#CAB6A4] rounded-full px-4 py-1 text-sm"
        >
          Register
        </button>
      </div>
    </div>
  );
}
