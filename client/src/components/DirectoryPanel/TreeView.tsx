import React, { useState } from "react";

import { FileSystemItem, Folder } from "@/lib/types";

import {
  LucideFile,
  LucideFolder,
  ChevronDown,
  ChevronRight,
  Trash,
  EllipsisVertical,
  FolderPlus,
  FilePlus,
} from "lucide-react";

interface TreeViewProps {
  item: FileSystemItem;
  parentId: string;
  onAddFile: (parentId: string, fileName: string) => void;
  onAddFolder: (parentId: string, folderName: string) => void;
  onDeleteItem: (parentId: string, itemId: string) => void;
  onUpdateItemName: (itemId: string, newName: string) => void;
  onSetActiveFile: (
    file_id: string,
    file_name: string,
    file_content: string
  ) => void;
  renderItems: (items: FileSystemItem[], parentId: string) => React.ReactNode;
}

const TreeView: React.FC<TreeViewProps> = ({
  item,
  parentId,
  onAddFile,
  onAddFolder,
  onDeleteItem,
  onUpdateItemName,
  onSetActiveFile,
  renderItems,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(item.name);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleNameSubmit = () => {
    !setNewName
      ? onUpdateItemName(item.id, "untitled")
      : onUpdateItemName(item.id, newName);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col ms-4 h-fit">
      <div className="flex justify-between items-center group hover:bg-muted px-2 py-1 rounded-md cursor-pointer">
        <div
          className="flex items-center gap-1"
          onDoubleClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
        >
          {item.type === "folder" && (
            <button onClick={toggleOpen}>
              {isOpen ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          )}
          {item.type === "folder" && (
            <LucideFolder className="h-4 w-4 text-muted-foreground" />
          )}
          {item.type === "file" && (
            <LucideFile className="ms-1 h-4 w-4 text-muted-foreground" />
          )}
          {isEditing ? (
            <input
              className="text-xs border focus:outline-none p-1 rounded-md"
              value={newName}
              onChange={handleNameChange}
              onBlur={handleNameSubmit}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleNameSubmit();
              }}
              autoFocus
            />
          ) : (
            <p
              className="text-xs"
              onClick={() =>
                item.type === "file" &&
                onSetActiveFile(item.id, item.name, item.content)
              }
            >
              {item.name}
            </p>
          )}
        </div>

        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {item.type === "folder" && (
            <>
              <FilePlus
                className="h-5 w-5 hover:bg-slate-300 p-1 rounded-md"
                onClick={() => onAddFile(item.id, "New File")}
              />
              <FolderPlus
                className="h-5 w-5 hover:bg-slate-300 p-1 rounded-md"
                onClick={() => onAddFolder(item.id, "New Folder")}
              />
            </>
          )}
          {item.id !== "root" && (
            <Trash
              className="h-5 w-5 hover:bg-slate-300 p-1 rounded-md"
              onClick={() => onDeleteItem(parentId, item.id)}
            />
          )}

          <EllipsisVertical className="h-5 w-5 hover:bg-slate-300 p-1 rounded-md" />
        </div>
      </div>

      {item.type === "folder" &&
        isOpen &&
        renderItems((item as Folder).children, item.id)}
    </div>
  );
};

export default TreeView;
