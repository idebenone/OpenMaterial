// import { memo } from "react";
// import { Handle, NodeProps, Position } from "reactflow";

// type NodeData = {
//   [key: string]: string | number | string[];
// };

// const CustomNode1 = ({ data }: NodeProps<NodeData>) => {
//   return (
//     <div className="border border-muted-foreground rounded-md w-200 w-80 bg-muted">
//       <div id="header" className="bg-primary rounded-ss-md rounded-se-md p-2">
//         <p className="text-white">{data.label}</p>
//       </div>

//       <div id="content" className="p-2">
//         <p>{data.content}</p>
//       </div>

//       <Handle type="source" position={Position.Bottom} />
//       <Handle type="target" position={Position.Top} />
//     </div>
//   );
// };

// export default memo(CustomNode1);
