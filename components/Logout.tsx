"use client";

import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { signOut } from "@/lib/actions/auth.actions";

const Logout = () => {
  const { push } = useRouter();

  const logout = async () => {
    await signOut();
    push("/sign-in");
  };

  return (
    <span className="relative group" onClick={logout}>
      <LogOutIcon className="cursor-pointer transition-transform hover:scale-110" />

      <span
        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2
                   px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0
                   group-hover:opacity-100 transition-opacity pointer-events-none
                   whitespace-nowrap z-10"
      >
        Log out
      </span>
    </span>
  );
};

export default Logout;
