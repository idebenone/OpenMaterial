import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node } from "reactflow";

const initialState: Node[] = []

export const nodeSlice = createSlice({
    name: "node",
    initialState,
    reducers: {
        setNodes: (_state, _action: PayloadAction<Node[]>) => {
            return _action.payload;
        },
        editNode: (_state, action: PayloadAction<Node>) => {
            const index = _state.findIndex(node => node.id === action.payload.id);
            if (index !== -1) {
                _state[index] = action.payload;
            }
        },
        deleteNode: (_state, action: PayloadAction<string>) => {
            return _state.filter(node => node.id !== action.payload);
        }
    }
})
export const { setNodes, editNode, deleteNode } = nodeSlice.actions;
export default nodeSlice.reducer;