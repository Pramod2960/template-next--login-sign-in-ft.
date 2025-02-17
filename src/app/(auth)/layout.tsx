"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

interface AuthLayoutProps {
  children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";

  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className=" flex justify-between items-center">
          <Image src="/niit_logo.png" alt="logo" height={39} width={106} />

          <Button asChild variant="secondary">
            <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
              {isSignIn ? "Sign Up" : "Log In"}
            </Link>
          </Button>
        </nav>

        <div className=" flex flex-col items-center  justify-center pt-4 md:pt-14 ">
          {children}
        </div>
      </div>
    </main>
  );
}

export default AuthLayout;
