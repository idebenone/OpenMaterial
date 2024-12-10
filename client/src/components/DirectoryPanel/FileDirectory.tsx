import { useEffect, useState, useCallback } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useParams } from "react-router-dom";

import {
  ActiveFileAtom,
  WorkspaceDirectoryAtom,
  WorkspaceFilesAtom,
} from "@/lib/atoms";
import {
  addItem,
  createFile,
  createFolder,
  deleteItem,
  transformStructure,
  updateFolder,
  updateItemName,
} from "@/lib/file-utility";
import { FileSystemItem, Folder } from "@/lib/types";

import {
  createFileInWorkspace,
  createFolderInWorkspace,
  deleteFileInWorkspace,
  deleteFolderInWorkspace,
  fetchWorkspaceDirectory,
} from "@/api/workspace";

import TreeView from "./TreeView";

/**
 * Custom hook to fetch and manage workspace file directory.
 */
const useWorkspaceDirectory = (workspaceId: string | undefined) => {
  const fileStructureAtom = useAtomValue(WorkspaceDirectoryAtom);
  const [fileStructure, setFileStructure] = useState<Folder | null>(null);

  const fetchDirectory = useCallback(async () => {
    if (!workspaceId) return;
    try {
      const response = await fetchWorkspaceDirectory(workspaceId);
      const transformedStructure = transformStructure(response.data.DATA);
      setFileStructure(transformedStructure || null);
    } catch (error) {
      console.error("Failed to fetch directory:", error);
    }
  }, [workspaceId]);

  useEffect(() => {
    fetchDirectory();
  }, [fetchDirectory]);

  useEffect(() => {
    setFileStructure(fileStructureAtom);
  }, [fileStructureAtom]);

  return { fileStructure, setFileStructure, refreshDirectory: fetchDirectory };
};

/**
 * FileDirectory Component
 * Displays and manages a workspace's directory structure.
 */
export default function FileDirectory() {
  const { id } = useParams<{ id: string }>();
  const setActiveFile = useSetAtom(ActiveFileAtom);
  const [, setWorkspaceFiles] = useAtom(WorkspaceFilesAtom);

  const { fileStructure, setFileStructure } = useWorkspaceDirectory(id);

  /**
   * On interacting with FileSystem core functionalities, it should:
   * 1) Update the server
   * 2) Update the state of tree view
   * 3) Update the workspace files
   */

  const handleCreateFile = useCallback(
    async (parentId: string, fileName: string) => {
      if (!fileStructure) return;
      try {
        /**
         * Creates a FileSystemItem of type 'file'
         */
        const newFile = createFile(fileName);
        /**
         * Update the server.
         */
        await createFileInWorkspace({
          file_name: fileName,
          folder_id: parentId,
          workspace_id: id!,
        });
        /**
         * Update the treeview state.
         */
        setFileStructure(
          updateFolder(fileStructure, parentId, (folder) =>
            addItem(folder, newFile)
          )
        );
        /**
         * Update the workspace files, if required.
         */
        handleSetActiveFile(newFile.id, newFile.name, "");
      } catch (error) {
        console.error("Error creating file:", error);
      }
    },
    [fileStructure, id, setFileStructure]
  );

  const handleCreateFolder = useCallback(
    async (parentId: string, folderName: string) => {
      if (!fileStructure) return;
      try {
        const newFolder = createFolder(folderName);
        await createFolderInWorkspace({
          workspace_id: id!,
          folder_name: folderName,
          parent_id: parentId,
        });
        setFileStructure(
          updateFolder(fileStructure, parentId, (folder) =>
            addItem(folder, newFolder)
          )
        );
      } catch (error) {
        console.error("Error creating folder:", error);
      }
    },
    [fileStructure, id, setFileStructure]
  );

  const handleDeleteItem = useCallback(
    async (parentId: string, itemId: string, type: string) => {
      if (!fileStructure) return;
      try {
        type === "file"
          ? await deleteFileInWorkspace({
              workspace_id: id!,
              file_id: itemId,
            })
          : await deleteFolderInWorkspace({
              workspace_id: id!,
              folder_id: itemId,
            });
        setFileStructure(
          updateFolder(fileStructure, parentId, (folder) =>
            deleteItem(folder, itemId)
          )
        );
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    },
    [fileStructure, setFileStructure]
  );

  const handleUpdateItemName = useCallback(
    (itemId: string, newName: string) => {
      if (!fileStructure) return;
      setFileStructure(updateItemName(fileStructure, itemId, newName));
    },
    [fileStructure, setFileStructure]
  );

  const handleSetActiveFile = useCallback(
    (fileId: string, fileName: string, fileContent: string) => {
      setActiveFile({
        file_id: fileId,
        file_name: fileName,
        file_content: fileContent,
      });
      setWorkspaceFiles((prev) => {
        const existingIndex = prev.findIndex((node) => node.file_id === fileId);
        if (existingIndex === -1)
          return [
            ...prev,
            { file_id: fileId, file_name: fileName, file_content: fileContent },
          ];
        return prev;
      });
    },
    [setActiveFile, setWorkspaceFiles]
  );

  const renderItems = useCallback(
    (items: FileSystemItem[], parentId: string) =>
      items.map((item) => (
        <TreeView
          key={item.id}
          item={item}
          parentId={parentId}
          onAddFile={handleCreateFile}
          onAddFolder={handleCreateFolder}
          onDeleteItem={handleDeleteItem}
          onUpdateItemName={handleUpdateItemName}
          onSetActiveFile={handleSetActiveFile}
          renderItems={renderItems}
        />
      )),
    [
      handleCreateFile,
      handleCreateFolder,
      handleDeleteItem,
      handleUpdateItemName,
      handleSetActiveFile,
    ]
  );

  if (!fileStructure) {
    return <div>Loading...</div>;
  }

  return (
    <TreeView
      item={fileStructure}
      parentId={fileStructure.id}
      onAddFile={handleCreateFile}
      onAddFolder={handleCreateFolder}
      onDeleteItem={handleDeleteItem}
      onUpdateItemName={handleUpdateItemName}
      onSetActiveFile={handleSetActiveFile}
      renderItems={renderItems}
    />
  );
}
