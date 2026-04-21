"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { useRef, useState } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Unlink,
  Minus,
  Image as ImageIcon,
  Code,
  Code2,
  FileText,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { uploadContentImage } from "@/lib/actions/files";

interface RichTextEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  className?: string;
}

function ToolbarButton({
  active,
  onClick,
  children,
  title,
  disabled,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded text-sm transition-colors hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed",
        active && "bg-muted text-foreground font-bold"
      )}
    >
      {children}
    </button>
  );
}

type Template = { label: string; description: string; html: string };

const TEMPLATES: Template[] = [
  {
    label: "Contact Block",
    description: "Phone / location / hours",
    html: `<h3>Contact</h3>
<ul>
<li><strong>Phone:</strong> 210-808-XXXX</li>
<li><strong>Location:</strong> Building XXXX</li>
<li><strong>Hours:</strong> Mon-Fri 0800-1630</li>
</ul>`,
  },
  {
    label: "Info Callout",
    description: "Highlighted note box",
    html: `<blockquote><p><strong>Note:</strong> Your information here.</p></blockquote>`,
  },
  {
    label: "Warning Callout",
    description: "Heads-up / caution",
    html: `<blockquote><p><strong>⚠️ Warning:</strong> Your warning here.</p></blockquote>`,
  },
  {
    label: "Critical Rules",
    description: "Red critical list",
    html: `<h3>Critical Rules</h3>
<ul>
<li><strong>Rule one</strong></li>
<li><strong>Rule two</strong></li>
<li><strong>Rule three</strong></li>
</ul>`,
  },
  {
    label: "Checklist Section",
    description: "Heading + bullets",
    html: `<h3>Section Title</h3>
<ul>
<li>Item one</li>
<li>Item two</li>
<li>Item three</li>
</ul>`,
  },
  {
    label: "Numbered Steps",
    description: "Heading + ordered list",
    html: `<h3>Steps</h3>
<ol>
<li>First step</li>
<li>Second step</li>
<li>Third step</li>
</ol>`,
  },
  {
    label: "Resource Links",
    description: "External link list",
    html: `<h3>Resources</h3>
<ul>
<li><a href="https://example.com">Resource name</a> — Brief description</li>
<li><a href="https://example.com">Another resource</a> — Brief description</li>
</ul>`,
  },
  {
    label: "Two Sections",
    description: "Sections with divider",
    html: `<h3>First Section</h3>
<p>Content for the first section.</p>
<hr>
<h3>Second Section</h3>
<p>Content for the second section.</p>`,
  },
];

export function RichTextEditor({
  content = "",
  onChange,
  placeholder = "Start writing...",
  className,
}: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-md border my-3 max-w-full h-auto",
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[300px] p-4 focus:outline-none [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-bold [&_h3]:text-lg [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_blockquote]:border-l-4 [&_blockquote]:border-military-blue [&_blockquote]:pl-4 [&_blockquote]:bg-military-blue/5 [&_blockquote]:py-2 [&_blockquote]:rounded-r [&_a]:text-military-blue [&_a]:underline [&_code]:bg-muted [&_code]:rounded [&_code]:px-1 [&_code]:text-xs [&_pre]:bg-muted [&_pre]:rounded [&_pre]:p-3 [&_pre]:text-xs [&_hr]:my-4 [&_hr]:border-t [&_hr]:border-border [&_img]:rounded-md",
      },
      handleDrop(_view, event) {
        const files = event.dataTransfer?.files;
        if (files && files.length > 0 && files[0].type.startsWith("image/")) {
          event.preventDefault();
          uploadAndInsertImage(files[0]);
          return true;
        }
        return false;
      },
    },
  });

  if (!editor) return null;

  async function uploadAndInsertImage(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const result = await uploadContentImage(fd);
      if ("error" in result && result.error) {
        alert(result.error);
        return;
      }
      if ("url" in result && result.url) {
        editor?.chain().focus().setImage({ src: result.url }).run();
      }
    } finally {
      setUploading(false);
    }
  }

  function addLink() {
    const prev = editor?.getAttributes("link").href;
    const url = window.prompt("Enter URL:", prev || "https://");
    if (url === null) return;
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  function insertTemplate(html: string) {
    editor?.chain().focus().insertContent(html).run();
    setShowTemplates(false);
  }

  const wordCount = editor.getText().trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className={cn("rounded-md border", className)}>
      <div className="flex flex-wrap items-center gap-0.5 border-b bg-muted/30 p-1">
        <ToolbarButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title="Underline"
        >
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}
          title="Inline code"
        >
          <Code className="h-4 w-4" />
        </ToolbarButton>

        <div className="mx-1 h-6 w-px bg-border" />

        <ToolbarButton
          active={editor.isActive("heading", { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>

        <div className="mx-1 h-6 w-px bg-border" />

        <ToolbarButton
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Ordered List"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="Callout / Blockquote"
        >
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          title="Code block"
        >
          <Code2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        >
          <Minus className="h-4 w-4" />
        </ToolbarButton>

        <div className="mx-1 h-6 w-px bg-border" />

        <ToolbarButton
          active={editor.isActive("link")}
          onClick={addLink}
          title="Add Link"
        >
          <LinkIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().unsetLink().run()}
          title="Remove Link"
        >
          <Unlink className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          title="Upload Image"
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ImageIcon className="h-4 w-4" />
          )}
        </ToolbarButton>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) uploadAndInsertImage(f);
            e.target.value = "";
          }}
        />

        <div className="mx-1 h-6 w-px bg-border" />

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowTemplates((v) => !v)}
            className="inline-flex h-8 items-center gap-1 rounded px-2 text-xs font-medium transition-colors hover:bg-muted"
            title="Insert Template"
          >
            <FileText className="h-4 w-4" />
            Templates
            <ChevronDown className="h-3 w-3" />
          </button>
          {showTemplates && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowTemplates(false)}
              />
              <div className="absolute left-0 top-9 z-20 w-64 rounded-md border bg-background shadow-lg">
                <div className="max-h-80 overflow-y-auto p-1">
                  {TEMPLATES.map((t) => (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() => insertTemplate(t.html)}
                      className="block w-full rounded px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
                    >
                      <div className="font-medium">{t.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {t.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="ml-auto flex items-center gap-0.5">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </ToolbarButton>
        </div>
      </div>

      <EditorContent editor={editor} />

      <div className="flex items-center justify-between border-t bg-muted/20 px-3 py-1.5 text-xs text-muted-foreground">
        <span>{wordCount} {wordCount === 1 ? "word" : "words"}</span>
        <span>Drag &amp; drop images to upload</span>
      </div>
    </div>
  );
}
