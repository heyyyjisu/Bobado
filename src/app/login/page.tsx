"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { setCookie } from "cookies-next";
import DecorativeTree from "@/components/DecorativeTree";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  async function handleLogin() {
    try {
      const res = await fetch("/api/auth/login", {
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
    <div className="w-full max-w-md mx-auto px-4 py-6">
      <h1 className="text-4xl text-center font-normal mb-6">bobado</h1>
      <DecorativeTree />
      <div className="bg-[#F0E8E0] rounded-2xl p-4 mb-4">
        <h1 className="text-lg font-bold mb-3">Log in</h1>
        <p className="text-sm mb-1">Email</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="What is your email?"
          className="w-full bg-transparent outline-none text-sm mb-3 border-b border-[#CAB6A4] pb-1"
        />
        <p className="text-sm mb-1">Password</p>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="What is your password?"
          className="w-full bg-transparent outline-none text-sm mb-3 border-b border-[#CAB6A4] pb-1"
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => router.push("/register")}
          className="text-sm opacity-50"
        >
          Register
        </button>
        <button
          onClick={() => handleLogin()}
          className="bg-[#CAB6A4] rounded-full px-4 py-1 text-sm"
        >
          Log in
        </button>
      </div>
    </div>
  );
}
