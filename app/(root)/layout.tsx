import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.actions";

import Logout from "@/components/Logout";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="root-layout">
      <nav className="w-full flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2">
          <Image src={"/logo.svg"} alt="logo" width={38} height={32} />

          <h2 className="text-primary-100">PrepWise</h2>
        </Link>

        <Logout />
      </nav>

      {children}
    </div>
  );
};

export default RootLayout;
