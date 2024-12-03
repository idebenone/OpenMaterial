import { useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  FitViewOptions,
  DefaultEdgeOptions,
  Controls,
  useNodesState,
  useEdgesState,
  Background,
  BackgroundVariant,
  NodeTypes,
} from "reactflow";
import "reactflow/dist/style.css";
import customNode from "./CustomNode";
import ReactFlowPanel from "../ReactFlowPanel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setActiveNodeEdge } from "@/redux/slices/activeNodeEdgeSlice";

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

const nodeTypes: NodeTypes = {
  custom: customNode,
};

const ReactFlowContainer = () => {
  const state_nodes = useSelector((state: RootState) => state.node);
  const state_edges = useSelector((state: RootState) => state.edge);
  const activeNodeEdge = useSelector(
    (state: RootState) => state.activeNodeEdge
  );

  const dispatch = useDispatch();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (nodes !== state_nodes) setNodes(state_nodes);
    if (edges !== state_edges) setEdges(state_edges);
  }, [state_nodes, state_edges]);

  return (
    <div className="h-full relative">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          defaultEdgeOptions={defaultEdgeOptions}
          nodeTypes={nodeTypes}
          fitViewOptions={fitViewOptions}
          onNodeClick={(_, node) => {
            dispatch(
              setActiveNodeEdge({
                activeEdge: activeNodeEdge.activeEdge,
                activeNode: node,
              })
            );
          }}
          onEdgeClick={(_, edge) => {
            dispatch(
              setActiveNodeEdge({
                activeEdge: edge,
                activeNode: activeNodeEdge.activeNode,
              })
            );
          }}
          fitView
        >
          <Background
            id="1"
            gap={10}
            color="#cc"
            variant={BackgroundVariant.Dots}
          />
        </ReactFlow>
        <Controls />
      </ReactFlowProvider>

      <ReactFlowPanel />
    </div>
  );
};

export default ReactFlowContainer;
