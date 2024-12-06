import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";

const extensions = [StarterKit];

interface TipTapProps {
  toolbar: boolean;
  content: string;
  editable: boolean;
  onUpdate?: (data: string) => void;
}

export default function Tiptap({
  toolbar,
  content,
  editable,
  onUpdate,
}: TipTapProps) {
  const editor = useEditor({
    content,
    extensions,
    editable,
    onUpdate: ({ editor }) => {
      if (onUpdate) onUpdate(editor.getText());
    },
  });

  if (!editor) {
    return <p>Something went wrong while creating editor instance!</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {toolbar && <Toolbar editor={editor} />}
      <div className="h-[90vh] overflow-y-scroll custom-scrollbar border rounded-lg">
        <EditorContent editor={editor} className="p-4" />
      </div>
    </div>
  );
}
