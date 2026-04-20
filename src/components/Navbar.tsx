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
      <h1 className="text-4xl text-center font-normal mb-6">bobado</h1>
      <button
        className="absolute right-0 bottom-0 bg-[#CAB6A4] rounded-full px-4 py-1 text-sm"
        onClick={() => handleLogout()}
      >
        Log out
      </button>
    </div>
  );
}
