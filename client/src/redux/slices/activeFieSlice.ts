import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkspaceFile } from "@/lib/interface";

const initialState: WorkspaceFile = {
    file_id: "",
    file_name: "",
    file_content: ""
}

export const activeFileSlice = createSlice({
    name: "activeFile",
    initialState,
    reducers: {
        setActiveFile: (_state, action: PayloadAction<WorkspaceFile>) => {
            return action.payload
        }
    }
})

export const { setActiveFile } = activeFileSlice.actions;
export default activeFileSlice.reducer;