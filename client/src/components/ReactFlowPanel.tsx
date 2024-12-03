import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ChevronsUpDown, Sparkles, Spline, Workflow } from "lucide-react";
import ReactFlowGenerator from "./ReactFlow/ReactFlowGenerator";

const ReactFlowPanel = () => {
  return (
    <div className="p-2 flex flex-col gap-4">
      <Button>Add Node</Button>

      <Collapsible className="border p-3 rounded-md">
        <CollapsibleTrigger className="flex justify-between items-center w-full">
          <span className="flex gap-2 items-center">
            <p className="font-semibold">Generate using AI</p>
            <Sparkles className="h-4 w-4" />
          </span>
          <ChevronsUpDown className="h-3 w-3" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <ReactFlowGenerator />
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="border p-3 rounded-md">
        <CollapsibleTrigger className="flex justify-between items-center w-full">
          <span className="flex gap-2 items-center">
            <p className="font-semibold">Node</p>
            <Workflow className="h-4 w-4" />
          </span>
          <ChevronsUpDown className="h-3 w-3" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2"></CollapsibleContent>
      </Collapsible>

      <Collapsible className="border p-3 rounded-md">
        <CollapsibleTrigger className="flex justify-between items-center w-full">
          <span className="flex gap-2 items-center">
            <p className="font-semibold">Edge</p>
            <Spline className="h-4 w-4" />
          </span>
          <ChevronsUpDown className="h-3 w-3" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2"></CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ReactFlowPanel;
