import React, { useEffect, useState } from "react";
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
  fetchWorkspaceDirectory,
} from "@/api/workspace";

import TreeView from "./TreeView";

const FileDirectory = () => {
  const { id } = useParams();
  const fileStructureAtom = useAtomValue(WorkspaceDirectoryAtom);
  const setActiveFile = useSetAtom(ActiveFileAtom);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setWorkspaceFiles] = useAtom(WorkspaceFilesAtom);

  const [fileStructure, setFileStructure] = useState<Folder | null>(null);

  /**
   * Fetches directory of a workspace from server.
   * @param workspaceId
   */
  const handleFetchDirectory = async (workspace_id: string) => {
    try {
      const structure = await fetchWorkspaceDirectory(workspace_id);
      const transformedStructure = transformStructure(structure.data.DATA);
      setFileStructure(transformedStructure || null);
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
        await createFileInWorkspace({
          file_name,
          folder_id: fileStructure.id,
          workspace_id: id!,
        });

        setFileStructure(
          updateFolder(fileStructure, parent_id, (folder) =>
            addItem(folder, newFile)
          )
        );
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
        await createFolderInWorkspace({
          workspace_id: id!,
          folder_name: folder_name,
          parent_id,
        });

        setFileStructure(
          updateFolder(fileStructure, parent_id, (folder) =>
            addItem(folder, newFolder)
          )
        );
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

  /**
   * Update file/folder name from the directory.
   * @param item_id
   * @param new_name
   */
  const handleUpdateItemName = (item_id: string, new_name: string) => {
    if (fileStructure) {
      setFileStructure(updateItemName(fileStructure, item_id, new_name));
    }
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
          onAddFile={handleCreateFile}
          onAddFolder={handleCreateFolder}
          onDeleteItem={handleDeleteItem}
          onUpdateItemName={handleUpdateItemName}
          onSetActiveFile={handleSetActiveFile}
          renderItems={renderItems}
        />
      ))}
    </div>
  );

  /**
   * Fetches file directory from the server whenever the page loads
   */
  useEffect(() => {
    handleFetchDirectory(id!);
  }, []);

  useEffect(() => {
    setFileStructure(fileStructureAtom);
  }, [fileStructureAtom]);

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
};

export default FileDirectory;
