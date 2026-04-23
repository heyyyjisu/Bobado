"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { setCookie } from "cookies-next";
import DecorativeTree from "@/components/DecorativeTree";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleLogin() {
    if (!email || !password) return toast.error("Fill right information.");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        console.error("Login failed");
        toast.error("User not found 📂");
        setLoading(false);
        return;
      }
      const result = await res.json();
      console.log(result);
      setCookie("token", result.token, { maxAge: 60 * 60 * 24 * 30 });
      router.push("/todos");
    } catch (error) {
      console.error(error);
      toast.error("Fail to log in 👎 Try again");
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
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="What is your email?"
          className="w-full bg-transparent outline-none text-sm mb-3 border-b border-[#CAB6A4] pb-1"
        />
        <p className="text-sm mb-1">Password</p>
        <input
          required
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
          className="bg-[#CAB6A4] rounded-full px-4 py-1 text-sm text-sm disabled:opacity-50 flex items-center gap-2 shadow-sm"
        >
          {loading ? (
            <>
              <Spinner /> Logging in...
            </>
          ) : (
            "Log in"
          )}
        </button>
      </div>
    </div>
  );
}
