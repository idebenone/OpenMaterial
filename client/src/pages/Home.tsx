import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteWorkspace, getWorkspaces } from "@/api/workspace";

import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import CreateWorkspace from "@/components/dialog/create-workspace";

export default function Home() {
  const navigate = useNavigate();

  const [dialogState, setDialogState] = useState<boolean>(false);
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
      toast.error("Couldn't fetch workspaces. Sorry!");
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
      toast.error("Couldn't delete the workspace. Sorry!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchWorkspaces();
  }, []);

  return (
    <div className="flex flex-col h-full w-full items-center">
      <div className="w-1/3 flex gap-2">
        {loading ? (
          <>
            <Skeleton className="w-full h-[100px] rounded-lg" />
            <Skeleton className="w-full h-[100px] rounded-lg" />
            <Skeleton className="w-full h-[100px] rounded-lg" />
          </>
        ) : (
          <>
            {workspaces.length !== 0 ? (
              workspaces.map((workspace) => (
                <div
                  key={workspace.workspace_id}
                  className="relative rounded-lg p-4 w-full border cursor-pointer hover:bg-muted group h-[100px]"
                  onClick={() =>
                    navigate(`/workspace/${workspace.workspace_id}`)
                  }
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
              ))
            ) : (
              <div className="flex gap-2 justify-center text-muted-foreground w-full">
                <p className="">No workspaces? Lets</p>
                <p
                  className="underline cursor-pointer"
                  onClick={() => setDialogState(!dialogState)}
                >
                  create one!
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <CreateWorkspace
        dialogState={dialogState}
        onCloseDialog={() => setDialogState(!dialogState)}
      />
    </div>
  );
}
