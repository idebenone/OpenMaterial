import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkspaceFile } from "@/lib/interface";

const initialState: WorkspaceFile[] = []

export const workspaceFilesSlice = createSlice({
    name: "workspaceFiles",
    initialState,
    reducers: {
        setWorkspaceFiles: (_state, action: PayloadAction<WorkspaceFile>) => {
            const index = _state.findIndex(node => node.file_id === action.payload.file_id);
            if (index === -1) {
                _state.push(action.payload)
            }
        },
        removeWorkspaceFile: (_state, action: PayloadAction<string>) => {
            return _state.filter(file => file.file_id !== action.payload)
        }
    }
})
export const { setWorkspaceFiles, removeWorkspaceFile } = workspaceFilesSlice.actions;
export default workspaceFilesSlice.reducer;