import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createWorkspace,
  deleteWorkspace,
  getWorkspaces,
} from "@/api/workspace";

import { Check, EllipsisVertical, Pencil, Trash, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Spinner from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [workspaces, setWorkspaces] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchWorkspaces = async () => {
    try {
      setLoading(true);
      const response = await getWorkspaces();
      if (response.data.DATA) {
        setWorkspaces(response.data.DATA);
      }
    } catch (error) {
      toast.error("Couldn't create a workspace. Sorry!");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWorkspace = async () => {
    try {
      setLoading(true);
      const response = await createWorkspace({
        user_id: "dummy",
        workspace_name: name,
        workspace_description: description,
      });

      if (response.data.DATA) {
        navigate(`/workspace/${response.data.DATA}`);
        toast.success("Workspace has been created successfully");
      } else {
        toast.success("Something went wrong!");
      }
    } catch (error) {
      toast.error("Couldn't create a workspace. Sorry!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWorkspace = async (workspace_id: string) => {
    try {
      setLoading(true);
      await deleteWorkspace(workspace_id);
      toast.success("Workspace has been deleted successfully");
      handleFetchWorkspaces();
    } catch (error) {
      toast.error("Couldn't create a workspace. Sorry!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchWorkspaces();
  }, []);

  return (
    <div className="flex flex-col h-full w-full justify-center items-center">
      <div className="w-1/3 flex gap-2">
        {workspaces.map((workspace) => (
          <div
            key={workspace.workspace_id}
            className="relative rounded-lg p-4 w-full border cursor-pointer hover:bg-muted group"
            onClick={() => navigate(`/workspace/${workspace.workspace_id}`)}
          >
            <div className="flex justify-between items-center">
              <p>{workspace.workspace_name}</p>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical className="h-4 w-4 hidden group-hover:block" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="flex items-center justify-between cursor-pointer">
                    <p>Rename</p>
                    <Pencil className="h-4 w-4" />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center justify-between cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDeleteWorkspace(workspace.workspace_id);
                    }}
                  >
                    <p className="text-destructive">Delete</p>
                    <Trash className="h-4 w-4 text-destructive" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="text-xs text-muted-foreground">
              {workspace.workspace_description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-12 flex flex-col gap-2 w-1/3">
        <p className="text-muted-foreground font-semibold">
          Let's create a workspace for ya!
        </p>
        <Input
          placeholder="what do you wanna call it?"
          onChange={(e) => setName(e.target.value)}
        />
        <Textarea
          placeholder="some description would be nice..."
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex gap-2 justify-end">
          <Button
            className={`${name ? "block" : "hidden"}`}
            disabled={!name}
            variant="destructive"
          >
            <span className="flex justify-center items-center gap-2">
              <p>Clear</p>
              <X className="h-4 w-4" />
            </span>
          </Button>
          <Button disabled={!name && loading} onClick={handleCreateWorkspace}>
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                <p>Creating</p>
                <Spinner />
              </span>
            ) : (
              <span className="flex justify-center items-center gap-2">
                <p>I'm ready!</p>
                <Check className="h-4 w-4" />
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
