import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Code2,
  CodeSquare,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  Link,
  List,
  ListOrdered,
  Quote,
  Redo,
  RemoveFormatting,
  SeparatorHorizontal,
  Strikethrough,
  Type,
  Undo,
  Unlink,
  WrapText,
} from "lucide-react";
import { setLink } from "./helpers/set-link";

interface ToolbarProps {
  editor: Editor;
}

export default function Toolbar({ editor }: ToolbarProps) {
  const isCursorOverLink = editor.getAttributes("link").href;

  return (
    <div className="flex justify-center border rounded-lg">
      <div className="flex gap-1">
        <div
          className="cursor-pointer p-2 hover:bg-muted rounded-lg"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </div>
        <div
          className="cursor-pointer p-2 hover:bg-muted rounded-lg"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </div>
        <div
          className="cursor-pointer p-2 hover:bg-muted rounded-lg"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="h-4 w-4" />
        </div>
        <div
          className="cursor-pointer p-2 hover:bg-muted rounded-lg"
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Code2 className="h-4 w-4" />
        </div>
        <div className="divider"></div>
        {/* <div
                className="icon"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .insertEmoji(sample(['😀', '😁', '😂', '😎', '😍', '😱']) as string)
                        .run()
                }>
                <RiEmotionLine />
            </div> */}
        <div className="divider"></div>
        <div
          className="cursor-pointer p-2 hover:bg-muted rounded-lg"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Heading1 className="h-4 w-4" />
        </div>
        <div
          className="cursor-pointer p-2 hover:bg-muted rounded-lg"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 className="h-4 w-4" />
        </div>
        <div
          className="cursor-pointer p-2 hover:bg-muted rounded-lg"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 className="h-4 w-4" />
        </div>
        <div
          className="cursor-pointer p-2 hover:bg-muted rounded-lg"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
        >
          <Heading4 className="h-4 w-4" />
        </div>
        <div
          className="cursor-pointer p-2 hover:bg-muted rounded-lg"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
        >
          <Heading5 className="h-4 w-4" />
        </div>
        <div
          className="cursor-pointer p-2 hover:bg-muted rounded-lg"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
        >
          <Heading6 className="h-4 w-4" />
        </div>
        <div
          className="cursor-pointer p-2 hover:bg-muted rounded-lg"
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          <Type className="h-4 w-4" />
        </div>
        <div
          className="cursor-pointer p-2 hover:bg-muted rounded-lg"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </div>
        <div
          className="cursor-pointer p-2 hover:bg-muted rounded-lg"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <List className="h-4 w-4" />
        </div>
        <div
          className="cursor-pointer p-2 hover:bg-muted rounded-lg"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <CodeSquare className="h-4 w-4" />
        </div>
        <div className="divider"></div>
        <div
          className="cursor-pointer p-2 hover:bg-muted rounded-lg"
          onClick={() => setLink(editor)}
        >
          <Link className="h-4 w-4" />
        </div>
        <div
          className={cn("cursor-pointer p-2 hover:bg-muted rounded-lg", {
            disabled: !isCursorOverLink,
          })}
          onClick={() => setLink(editor)}
        >
          <Unlink className="h-4 w-4" />
        </div>
        <div className="divider"></div>
        <div
          className="cursor-pointer p-2 hover:bg-muted rounded-lg"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="h-4 w-4" />
        </div>
        <div
          className="cursor-pointer p-2 hover:bg-muted rounded-lg"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <SeparatorHorizontal className="h-4 w-4" />
        </div>
        <div className="divider"></div>
        <div
          className="cursor-pointer p-2 hover:bg-muted rounded-lg"
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          <WrapText className="h-4 w-4" />
        </div>
        <div
          className="cursor-pointer p-2 hover:bg-muted rounded-lg"
          onClick={() =>
            editor.chain().focus().unsetAllMarks().clearNodes().run()
          }
        >
          <RemoveFormatting className="h-4 w-4" />
        </div>
        <div className="divider"></div>
        <div
          className="cursor-pointer p-2 hover:bg-muted rounded-lg"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo className="h-4 w-4" />
        </div>
        <div
          className="cursor-pointer p-2 hover:bg-muted rounded-lg"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
