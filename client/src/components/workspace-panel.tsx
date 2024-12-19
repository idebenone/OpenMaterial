import React from "react";
import { Link } from "react-router-dom";

import { Files, Home, Workflow } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import useUserSession from "@/hooks/useUserSession";

interface WorkSpacePanelProps {
  onToggle: (type: string) => void;
}

const WorkSpacePanel: React.FC<WorkSpacePanelProps> = ({ onToggle }) => {
  const { handleLogout, user } = useUserSession();

  return (
    <div className="h-full p-2 border-l bg-muted flex flex-col justify-between items-center">
      <div className="h-full flex flex-col gap-2">
        <div
          className="p-2 border border-muted-foreground hover:bg-muted-foreground cursor-pointer w-full rounded-lg"
          onClick={() => onToggle("files")}
        >
          <Files className="h-5 w-5" />
        </div>

        <div
          className="p-2 border border-muted-foreground hover:bg-muted-foreground cursor-pointer w-full rounded-lg"
          onClick={() => onToggle("nodes")}
        >
          <Workflow className="h-5 w-5" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Link
          to="/home"
          className="border border-muted-foreground p-2 rounded-lg hover:bg-muted-foreground"
        >
          <Home className="h-4 w-4" />
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <img src={user!.pfp} alt="" className="rounded-lg h-8 w-8" />
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
      </div>
    </div>
  );
};

export default WorkSpacePanel;
