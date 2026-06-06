'use client';

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react";
import NavItems from "./NavItems";
import { signOut } from "@/lib/actions/auth.actions";

const UserDropdown = ({user} : {user: User}) => {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push("/sign-in");
    }

    return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-3 text-gray-4 hover:text-yellow-500">
            <div className="flex flex-row flex-wrap items-center gap-6 md:gap-12">
                <Avatar>
                    <AvatarImage
                    src="https://github.com/evilrabbit.png"
                    alt="@evilrabbit"
                    />
                    <AvatarFallback>ER</AvatarFallback>
                    <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                </Avatar>
             </div>
            <div className="hidden md:flex flex-col items-start">
                <span className="text-base font-medium texxt-gray-400">{user.name}</span>
            </div>        
        </Button>
      </DropdownMenuTrigger>
            <DropdownMenuContent className="text-gray-400" align="start">
                <div className="flex relative items-center gap-3 py-2">
            <Avatar className="h-10 w-10">
                <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
                <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                    </Avatar>
                <div className="flex flex-col">
                    <span className="text-base font-medium text-gray-400">{user.name}</span>
                    <span className="text-sm text-gray-500">{user.email}</span>
            </div> 
                </div>
                <DropdownMenuSeparator className="bg-gray-600" />
                <DropdownMenuItem onClick={handleSignOut} className="text-gray-100 text-md font-medium focus:bg-transparent focus:text-yellow-500 transition-colors cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2 hidden sm:block" />
                    LogOut
                </DropdownMenuItem>
                <DropdownMenuSeparator className="hidden sm:block bg-gray-600"/>
                <nav className="sm:hidden">
                    <NavItems />
                </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown;