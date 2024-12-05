import React, { useEffect, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { useParams } from "react-router-dom";

import { FileSystemItem, Folder } from "@/lib/interface";
import {
  addItem,
  createFile,
  createFolder,
  deleteItem,
  updateItemName,
} from "@/lib/utils";
import {
  ActiveFileAtom,
  WorkspaceDirectoryAtom,
  WorkspaceFilesAtom,
} from "@/lib/atoms";
import TreeView from "./TreeView";
import {
  createFileInWorkspace,
  createFolderInWorkspace,
  fetchWorkspaceDirectory,
} from "@/api/workspace";

const FileDirectory = () => {
  const { id } = useParams();

  // const structure = useAtomValue(WorkspaceDirectoryAtom);
  const setActiveFile = useSetAtom(ActiveFileAtom);
  const [_, setWorkspaceFiles] = useAtom(WorkspaceFilesAtom);
  const [fileStructure, setFileStructure] = useState<Folder | null>(null);

  /**
   * Fetches directory of a workspace from server.
   * @param workspaceId
   */
  const handleFetchDirectory = async (workspace_id: string) => {
    try {
      const structure = await fetchWorkspaceDirectory(workspace_id);
      setFileStructure(structure.data.DATA);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Create file in the directory.
   * @param parent_id
   * @param file_name
   */
  const handleCreateFile = async (parent_id: string, file_name: string) => {
    try {
      if (fileStructure) {
        const newFile = createFile(file_name);
        const response = await createFileInWorkspace({
          file_name,
          folder_id: fileStructure.id,
          workspace_id: id!,
        });

        if (response.statusText.includes("200")) {
          setFileStructure(
            updateFolder(fileStructure, parent_id, (folder) =>
              addItem(folder, newFile)
            )
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Create folder in the directory.
   * @param parent_id
   * @param folder_name
   */
  const handleCreateFolder = async (parent_id: string, folder_name: string) => {
    try {
      if (fileStructure) {
        const newFolder = createFolder(folder_name);
        const response = await createFolderInWorkspace({
          workspace_id: id!,
          folder_name: folder_name,
          parent_id,
        });

        if (response.statusText.includes("200")) {
          setFileStructure(
            updateFolder(fileStructure, parent_id, (folder) =>
              addItem(folder, newFolder)
            )
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Delete file/folder from the directory.
   * @param parent_id
   * @param item_id
   */
  const handleDeleteItem = async (parent_id: string, item_id: string) => {
    try {
      if (fileStructure) {
        setFileStructure(
          updateFolder(fileStructure, parent_id, (folder) =>
            deleteItem(folder, item_id)
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateItemName = (itemId: string, newName: string) => {
    if (fileStructure) {
      setFileStructure(updateItemName(fileStructure, itemId, newName));
    }
  };

  const updateFolder = (
    folder: Folder,
    targetId: string,
    updateFn: (folder: Folder) => Folder
  ): Folder => {
    if (folder.id === targetId) {
      return updateFn(folder);
    }

    return {
      ...folder,
      children: folder.children.map((child) => {
        if (child.type === "folder") {
          return updateFolder(child as Folder, targetId, updateFn);
        }
        return child;
      }),
    };
  };

  const handleSetActiveFile = (
    file_id: string,
    file_name: string,
    file_content: string
  ) => {
    setActiveFile({ file_id, file_name, file_content });
    setWorkspaceFiles((prev) => {
      const index = prev.findIndex((node) => node.file_id === file_id);
      if (index === -1) return [...prev, { file_id, file_name, file_content }];
      return prev;
    });
  };

  const renderItems = (
    items: FileSystemItem[],
    parentId: string
  ): React.ReactNode => (
    <div>
      {items.map((item) => (
        <TreeView
          key={item.id}
          item={item}
          parentId={parentId}
          handleAddFile={handleCreateFile}
          handleAddFolder={handleCreateFolder}
          handleDeleteItem={handleDeleteItem}
          handleUpdateItemName={handleUpdateItemName}
          handleSetActiveFile={handleSetActiveFile}
          renderItems={renderItems}
        />
      ))}
    </div>
  );

  useEffect(() => {
    handleFetchDirectory(id!);
  }, []);

  if (!fileStructure) {
    return <div>Loading...</div>;
  }

  return (
    <TreeView
      item={fileStructure}
      parentId={fileStructure.id}
      handleAddFile={handleCreateFile}
      handleAddFolder={handleCreateFolder}
      handleDeleteItem={handleDeleteItem}
      handleUpdateItemName={handleUpdateItemName}
      handleSetActiveFile={handleSetActiveFile}
      renderItems={renderItems}
    />
  );
};

export default FileDirectory;
