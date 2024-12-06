import { useState, memo, useCallback } from "react";
import { useAtom } from "jotai";

import { ActiveFileAtom, WorkspaceFilesAtom } from "@/lib/atoms";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { File, X } from "lucide-react";

import WorkSpacePanel from "@/components/WorkSpacePanel";
import ReactFlowPanel from "@/components/ReactFlowPanel";
import FileDirectoryPanel from "@/components/DirectoryPanel/FileDirectoryPanel";
import { WorkspaceFile } from "@/lib/types";
import Tiptap from "@/components/Editor/TipTap";

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
  const [workspaceFiles, setWorkspaceFiles] = useAtom(WorkspaceFilesAtom);
  const [activeFile, setActiveFile] = useAtom(ActiveFileAtom);
  const [fileDirectoryState, setFileDirectoryState] = useState<{
    state: boolean;
    type: string;
  }>({
    state: false,
    type: "",
  });

  const handleFileSelect = useCallback((file: WorkspaceFile) => {
    setActiveFile(file);
  }, []);

  const handleFileClose = useCallback((file_id: string) => {
    setWorkspaceFiles((prev) =>
      prev.filter((file) => file.file_id !== file_id)
    );
  }, []);

  return (
    <div className="h-full flex">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          {workspaceFiles.length !== 0 && (
            <FileTabList
              files={workspaceFiles}
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

      {/**
       * SidePanel to different workspace sections like directory, react-flow nodes etc
       */}
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
