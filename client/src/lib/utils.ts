import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { v4 as uuidv4 } from 'uuid';
import { FileSystemItem, Folder } from './interface';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createFile = (name: string): FileSystemItem => ({
  id: uuidv4(),
  name,
  type: 'file',
});

export const createFolder = (name: string): FileSystemItem => ({
  id: uuidv4(),
  name,
  type: 'folder',
  children: [],
});

export const addItem = (folder: Folder, item: FileSystemItem): Folder => {
  return {
    ...folder,
    children: [...folder.children, item],
  };
};

export const deleteItem = (folder: Folder, itemId: string): Folder => {
  return {
    ...folder,
    children: folder.children.filter(item => item.id !== itemId),
  };
};

export const updateItemName = (
  folder: Folder,
  itemId: string,
  newName: string
): Folder => {
  if (folder.id === itemId) {
    return {
      ...folder,
      name: newName,
    };
  }

  return {
    ...folder,
    children: folder.children.map((child) => {
      if (child.id === itemId) {
        return {
          ...child,
          name: newName,
        };
      } else if (child.type === "folder") {
        return updateItemName(child as Folder, itemId, newName);
      }
      return child;
    }),
  };
};
