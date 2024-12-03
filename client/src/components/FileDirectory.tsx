import React, { useEffect, useState } from "react";
import { FileSystemItem, Folder } from "@/lib/interface";
import {
  addItem,
  createFile,
  createFolder,
  deleteItem,
  updateItemName,
} from "@/lib/utils";
import TreeView from "./TreeView";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setDirectory } from "@/redux/slices/fileDirectorySlice";
import { localSync } from "@/api/local";
import { setWorkspaceFiles } from "@/redux/slices/workspaceFilesSlice";
import { setActiveFile } from "@/redux/slices/activeFieSlice";

const FileDirectory = () => {
  const state_structure = useSelector((state: RootState) => state.structure);
  const dispatch = useDispatch();
  const [rootFolder, setRootFolder] = useState<Folder | null>(null);

  const handleAddFile = (parentId: string, fileName: string) => {
    if (rootFolder) {
      const newFile = createFile(fileName);
      setRootFolder(
        updateFolder(rootFolder, parentId, (folder) => addItem(folder, newFile))
      );
    }
  };

  const handleAddFolder = (parentId: string, folderName: string) => {
    if (rootFolder) {
      const newFolder = createFolder(folderName);
      setRootFolder(
        updateFolder(rootFolder, parentId, (folder) =>
          addItem(folder, newFolder)
        )
      );
    }
  };

  const handleDeleteItem = (parentId: string, itemId: string) => {
    if (rootFolder) {
      setRootFolder(
        updateFolder(rootFolder, parentId, (folder) =>
          deleteItem(folder, itemId)
        )
      );
    }
  };

  const handleUpdateItemName = (itemId: string, newName: string) => {
    if (rootFolder) {
      setRootFolder(updateItemName(rootFolder, itemId, newName));
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
    dispatch(setWorkspaceFiles({ file_id, file_name, file_content }));
    dispatch(setActiveFile({ file_id, file_name, file_content }));
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
          handleAddFile={handleAddFile}
          handleAddFolder={handleAddFolder}
          handleDeleteItem={handleDeleteItem}
          handleUpdateItemName={handleUpdateItemName}
          handleSetActiveFile={handleSetActiveFile}
          renderItems={renderItems}
        />
      ))}
    </div>
  );

  useEffect(() => {
    setRootFolder(state_structure);
  }, []);

  useEffect(() => {
    if (rootFolder) {
      dispatch(setDirectory(rootFolder));
      localSync("structure", rootFolder);
    }
  }, [rootFolder]);

  if (!rootFolder) {
    return <div>Loading...</div>;
  }

  return (
    <TreeView
      item={rootFolder}
      parentId={rootFolder.id}
      handleAddFile={handleAddFile}
      handleAddFolder={handleAddFolder}
      handleDeleteItem={handleDeleteItem}
      handleUpdateItemName={handleUpdateItemName}
      handleSetActiveFile={handleSetActiveFile}
      renderItems={renderItems}
    />
  );
};

export default FileDirectory;
