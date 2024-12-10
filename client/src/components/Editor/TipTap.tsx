import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";

const extensions = [StarterKit];

interface TipTapProps {
  toolbar: boolean;
  content: string;
  editable: boolean;
  onUpdate?: (data: string) => void;
  onSave?: () => void;
}

export default function Tiptap({
  toolbar,
  content,
  editable,
  onUpdate,
  onSave,
}: TipTapProps) {
  const editor = useEditor({
    content,
    extensions,
    editable,
    onUpdate: ({ editor }) => {
      if (onUpdate) onUpdate(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none prose:",
      },
    },
  });

  if (!editor) {
    return <p>Something went wrong while creating editor instance!</p>;
  }

  const handleSaveEvent = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      if (onSave) onSave();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {toolbar && <Toolbar editor={editor} />}
      <div className="h-[90vh] overflow-y-scroll custom-scrollbar border rounded-lg">
        <EditorContent
          editor={editor}
          className="p-12 w-full"
          onKeyDown={handleSaveEvent}
        />
      </div>
    </div>
  );
}
