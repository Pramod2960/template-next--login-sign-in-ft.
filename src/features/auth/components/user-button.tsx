"use client";

import { Loader, LogOut } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { useCurrent } from "../api/use-current";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DottedSeparator } from "@/components/dotted-separator";
import { useLogout } from "../api/use-logout";

function UserButton() {
  const { data: user, isLoading } = useCurrent();
  const { mutate: logout } = useLogout();

  if (isLoading) {
    <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300 ">
      <Loader className="size-4 animate-spin text-muted-foreground" />
    </div>;
  }

  if (!user) {
    return null;
  }

  const { name, email } = user;

  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase() ?? "U";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300 ">
          <AvatarFallback className="bg-neutral-200 w-full font-medium text-neutral-500 flex items-center justify-center">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-[52px]  border border-neutral-300 ">
            <AvatarFallback className="bg-neutral-200 w-full font-medium text-neutral-500 text-xl flex items-center justify-center">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">
              {name || "User"}
            </p>
            <p
              className=" text-xs text-neutral-500 
                      "
            >
              {email}
            </p>
          </div>
          <DottedSeparator className="mb-1" />

          <DropdownMenuItem
            className="h-10 items-center w-full justify-center text-amber-700 font-medium cursor-pointer"
            onClick={() => logout()}
          >
            <LogOut className="size-4 mr-2 w-full" />
            Logout
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;