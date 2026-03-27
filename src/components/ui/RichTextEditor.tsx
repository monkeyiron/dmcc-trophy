import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { Bold, Italic, List, ListOrdered, Quote, Strikethrough } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function RichTextEditor({ 
  value, 
  onChange, 
  placeholder 
}: { 
  value: string, 
  onChange: (val: string) => void, 
  placeholder?: string 
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder || 'Type your message...',
        emptyEditorClass: 'cursor-text before:content-[attr(data-placeholder)] before:text-muted-foreground before:absolute before:pointer-events-none'
      })
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'min-h-[150px] w-full bg-transparent px-3 py-2 text-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 prose prose-sm dark:prose-invert max-w-none break-words'
      }
    }
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  if (!editor) {
    return null
  }

  const toggleClass = (isActive: boolean) => cn(
    "rounded-none h-8 w-8 p-0 hover:bg-muted transition-colors",
    isActive && "bg-primary/20 text-primary hover:bg-primary/30"
  )

  return (
    <div className="flex flex-col w-full border bg-background/50 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all rounded-none shadow-sm">
      <div className="flex flex-wrap items-center gap-1 border-b bg-muted/20 p-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          aria-label="Bold"
          title="Bold"
          aria-pressed={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={toggleClass(editor.isActive('bold'))}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          aria-label="Italic"
          title="Italic"
          aria-pressed={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={toggleClass(editor.isActive('italic'))}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          aria-label="Strikethrough"
          title="Strikethrough"
          aria-pressed={editor.isActive('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={toggleClass(editor.isActive('strike'))}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        
        <div className="w-px h-4 bg-border mx-1" />
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          aria-label="Bullet list"
          title="Bullet list"
          aria-pressed={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={toggleClass(editor.isActive('bulletList'))}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          aria-label="Ordered list"
          title="Ordered list"
          aria-pressed={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={toggleClass(editor.isActive('orderedList'))}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          aria-label="Blockquote"
          title="Blockquote"
          aria-pressed={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={toggleClass(editor.isActive('blockquote'))}
        >
          <Quote className="h-4 w-4" />
        </Button>
      </div>
      <EditorContent editor={editor} className="p-1 relative [&_.ProseMirror]:min-h-[120px]" />
    </div>
  )
}
