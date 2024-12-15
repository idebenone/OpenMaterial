// import { useRef, useState } from "react";
// import { Textarea } from "../ui/textarea";
// import { Button } from "../ui/button";
// import { ArrowUpIcon } from "@radix-ui/react-icons";
// import { generateChartData } from "@/api/gemini";
// import { X } from "lucide-react";
// import { useDispatch } from "react-redux";
// import { setNodes } from "@/redux/slices/nodeSlice";
// import { setEdges } from "@/redux/slices/edgeSlice";

// const ReactFlowGenerator = () => {
//   const dispatch = useDispatch();
//   const textAreadRef = useRef<HTMLTextAreaElement>(null);
//   const [prompt, setPrompt] = useState<string>("");

//   const handleSubmitPrompt = async () => {
//     try {
//       const response = await generateChartData(prompt);
//       dispatch(setNodes(response.data.DATA.nodes));
//       dispatch(setEdges(response.data.DATA.edges));
//       handleClearTextArea();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleClearTextArea = () => {
//     if (textAreadRef.current) textAreadRef.current.value = "";
//   };

//   return (
//     <div className="w-full flex flex-col gap-2">
//       <Textarea
//         ref={textAreadRef}
//         placeholder="What would you like to learn today?"
//         className="focus:outline-none border p-2 min-h-[100px]"
//         onChange={(e) => setPrompt(e.target.value)}
//       />
//       <div className="flex justify-between">
//         <Button
//           className="flex gap-2 items-center"
//           variant="outline"
//           onClick={handleClearTextArea}
//         >
//           <p>Clear</p>
//           <X className="h-4 w-4" />
//         </Button>
//         <Button
//           className="flex gap-2 items-center"
//           onClick={handleSubmitPrompt}
//         >
//           <p>Submit</p>
//           <ArrowUpIcon className="w-4 h-4" />
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ReactFlowGenerator;
