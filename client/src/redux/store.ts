import { configureStore } from "@reduxjs/toolkit";
import nodeSlice from "./slices/nodeSlice";
import edgeSlice from "./slices/edgeSlice";
import activeNodeEdgeSlice from "./slices/activeNodeEdgeSlice";
import fileDirectorySlice from "./slices/fileDirectorySlice";
import workspaceFilesSlice from "./slices/workspaceFilesSlice";
import activeFieSlice from "./slices/activeFieSlice";


export const store = configureStore({
    reducer: {
        node: nodeSlice,
        edge: edgeSlice,
        activeNodeEdge: activeNodeEdgeSlice,
        structure: fileDirectorySlice,
        workspaceFiles: workspaceFilesSlice,
        activeFile: activeFieSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;