import { Folder } from "@/lib/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Folder = {
    id: "",
    name: "",
    type: "folder",
    children: []
}

export const fileDirectorySlice = createSlice({
    name: "fileStructure",
    initialState,
    reducers: {
        setDirectory: (_state, action: PayloadAction<Folder>) => {
            return action.payload
        }
    }
})

export const { setDirectory } = fileDirectorySlice.actions;
export default fileDirectorySlice.reducer;