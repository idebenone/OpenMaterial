import { Files, Workflow } from "lucide-react";
import React from "react";

interface WorkSpacePanelProps {
  onToggle: (type: string) => void;
}

const WorkSpacePanel: React.FC<WorkSpacePanelProps> = ({ onToggle }) => {
  return (
    <div className="h-full p-1 border-l bg-muted flex flex-col gap-2">
      <div
        className="p-2 hover:bg-neutral-200 cursor-pointer w-full rounded-md"
        onClick={() => onToggle("files")}
      >
        <Files className="h-5 w-5" />
      </div>

      <div
        className="p-2 hover:bg-neutral-200 cursor-pointer w-full rounded-md"
        onClick={() => onToggle("nodes")}
      >
        <Workflow className="h-5 w-5" />
      </div>
    </div>
  );
};

export default WorkSpacePanel;
