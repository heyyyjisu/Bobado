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
    <div>
      <button onClick={() => handleLogout()}>Log out</button>
    </div>
  );
}
