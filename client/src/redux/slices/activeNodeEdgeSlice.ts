import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node, Edge } from "reactflow";

interface ActiveNodeEdge {
    activeNode: Node;
    activeEdge: Edge;
}

const initialState: ActiveNodeEdge = {
    activeNode: {
        id: "",
        position: {
            x: 0,
            y: 0
        },
        data: undefined
    },
    activeEdge: {
        id: "",
        source: "",
        target: "",
        sourceHandle: null,
        targetHandle: null,
    }
}

export const activeNodeEdgeSlice = createSlice({
    name: "activeNodeEdge",
    initialState,
    reducers: {
        setActiveNodeEdge: (_state, action: PayloadAction<ActiveNodeEdge>) => {
            return action.payload;
        }
    }
})

export const { setActiveNodeEdge } = activeNodeEdgeSlice.actions;
export default activeNodeEdgeSlice.reducer;