import { Link } from "react-router-dom";

import { BookOpen, Github, Home } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { authorize_github } from "@/api/auth";
import useUserSession from "@/hooks/useUserSession";

export default function TopNav() {
  const { isLoggedIn, handleLogout, user } = useUserSession();

  const handleGitAuth = () => {
    try {
      window.location.assign(authorize_github(true));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed w-full flex justify-center border-b">
      <div className="w-1/2 flex justify-between items-center py-4">
        <Link to="/">
          <span className="flex items-center gap-2">
            <BookOpen />
            <p className="font-bold">OpenMaterial</p>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/home" className="border p-2 rounded-lg">
            <Home className="h-4 w-4" />
          </Link>
          {isLoggedIn && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <img src={user.pfp} alt="" className="rounded-lg h-8 w-8" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>My Account</DropdownMenuItem>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={handleLogout}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button className="flex gap-2 items-center" onClick={handleGitAuth}>
              <Github className="h-4 w-4" />
              <p>Sign in</p>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
