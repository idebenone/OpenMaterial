import { useState, memo, useCallback, useEffect } from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { File, X } from "lucide-react";

import WorkSpacePanel from "@/components/WorkSpacePanel";
import ReactFlowPanel from "@/components/ReactFlowPanel";
import FileDirectoryPanel from "@/components/FileDirectoryPanel";
import { useDispatch, useSelector } from "react-redux";
import { localFetch } from "@/api/local";
import { setDirectory } from "@/redux/slices/fileDirectorySlice";
import { WorkspaceFile } from "@/lib/interface";
import { RootState } from "@/redux/store";
import { removeWorkspaceFile } from "@/redux/slices/workspaceFilesSlice";
import { setActiveFile } from "@/redux/slices/activeFieSlice";

const FileTab = memo(
  ({
    file,
    isActive,
    onSelect,
    onClose,
  }: {
    file: WorkspaceFile;
    isActive: boolean;
    onSelect: () => void;
    onClose: () => void;
  }) => {
    return (
      <span
        className={`flex justify-between items-center p-1 cursor-pointer rounded-md border
          ${
            isActive
              ? "min-w-32 bg-muted"
              : "hover:bg-muted group transition-all duration-300 ease-in-out"
          }
          ${isActive ? "" : "w-7 hover:w-32"}`}
        onClick={isActive ? undefined : onSelect}
      >
        <span className="flex gap-2 items-center">
          <File className="h-4 w-4" />
          <p
            className={`text-xs font-semibold ${
              isActive ? "" : "hidden group-hover:block"
            }`}
          >
            {file.file_name}
          </p>
        </span>
        <X
          className={`h-4 w-4 cursor-pointer hover:bg-neutral-300 p-0.5 rounded-sm ${
            isActive ? "" : "hidden group-hover:block"
          }`}
          onClick={onClose}
        />
      </span>

      // <span
      //   className={`flex justify-between items-center p-1 cursor-pointer rounded-md border`}
      // >
      //   <span className="flex gap-2 items-center">
      //     <File className="h-4 w-4" />
      //     <p className={`text-xs font-semibold`}>{file.file_name}</p>
      //   </span>
      //   <X
      //     className={`h-4 w-4 cursor-pointer hover:bg-neutral-300 p-0.5 rounded-sm`}
      //     onClick={onClose}
      //   />
      // </span>
    );
  }
);

const FileTabList = ({
  files,
  activeFileId,
  onSelect,
  onClose,
}: {
  files: WorkspaceFile[];
  activeFileId: string;
  onSelect: (file: WorkspaceFile) => void;
  onClose: (file_id: string) => void;
}) => {
  return (
    <div className="flex gap-1 p-2">
      {files.map((file) => (
        <FileTab
          key={file.file_id}
          file={file}
          isActive={file.file_id === activeFileId}
          onSelect={() => onSelect(file)}
          onClose={() => onClose(file.file_id)}
        />
      ))}
    </div>
  );
};

const WorkSpace = () => {
  const dispatch = useDispatch();
  const _workspaceFiles = useSelector(
    (state: RootState) => state.workspaceFiles
  );
  const activeFile = useSelector((state: RootState) => state.activeFile);
  const [fileDirectoryState, setFileDirectoryState] = useState<any>({
    state: false,
    type: "",
  });

  const handleFileSelect = useCallback((file: WorkspaceFile) => {
    dispatch(setActiveFile(file));
  }, []);

  const handleFileClose = useCallback((file_id: string) => {
    dispatch(removeWorkspaceFile(file_id));
  }, []);

  useEffect(() => {
    console.log("FROM WORKSPACE", _workspaceFiles);
  }, [_workspaceFiles]);

  useEffect(() => {
    const localStructure: any = localFetch("structure");
    if (localStructure.length !== 0) {
      dispatch(setDirectory(localStructure));
    } else {
      dispatch(
        setDirectory({
          id: "root",
          name: "Getting Started",
          type: "folder",
          children: [
            {
              id: "child",
              name: "Hello.txt",
              type: "file",
            },
          ],
        })
      );
    }
  }, [dispatch]);

  return (
    <div className="h-full flex">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          {_workspaceFiles.length !== 0 && (
            <FileTabList
              files={_workspaceFiles}
              activeFileId={activeFile.file_id}
              onSelect={handleFileSelect}
              onClose={handleFileClose}
            />
          )}
        </ResizablePanel>
        {fileDirectoryState.state && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={20} minSize={15} maxSize={50}>
              {fileDirectoryState.type == "files" && <FileDirectoryPanel />}
              {fileDirectoryState.type == "nodes" && <ReactFlowPanel />}
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>

      <WorkSpacePanel
        onToggle={(type: string) =>
          setFileDirectoryState({
            state:
              fileDirectoryState.type == type
                ? !fileDirectoryState.state
                : true,
            type,
          })
        }
      />
    </div>
  );
};

export default WorkSpace;
