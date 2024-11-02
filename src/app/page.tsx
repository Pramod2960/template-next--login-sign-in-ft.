import { getCurrent } from "@/features/auth/action";
import UserButton from "@/features/auth/components/user-button";
import { redirect, useRouter } from "next/navigation";
import React from "react";

async function Home() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return (
    <div>
      <UserButton />
    </div>
  );
}

export default Home;
