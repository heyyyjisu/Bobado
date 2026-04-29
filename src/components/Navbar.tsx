"use client";

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  async function handleLogout() {
    await deleteCookie("token");
    router.push("/login");
  }

  return (
    <div className="relative">
      <h1 className="text-4xl text-center font-normal mb-4">bobado</h1>
      <div className="relative flex justify-end items-center">
        <a
          href="https://buymeacoffee.com/heyyyjisu"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-1/2 -translate-x-1/2 text-xs opacity-40"
        >
          ☕ buy me a coffee
        </a>
        <button
          className="bg-[#CAB6A4] rounded-full px-4 py-1 text-sm shadow-sm"
          onClick={() => handleLogout()}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
