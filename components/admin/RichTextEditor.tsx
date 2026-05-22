'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { useCallback, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string, json: object) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder: placeholder || 'Start writing...' }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose-editor min-h-[400px] focus:outline-none px-5 py-5',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML(), editor.getJSON());
    },
  });

  const handleImageUpload = useCallback(async (file: File) => {
    if (!editor) return;
    const supabase = createClient();
    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'media';

    const { error } = await supabase.storage.from(bucket).upload(filename, file);
    if (error) {
      alert('Image upload failed: ' + error.message);
      return;
    }
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filename);
    const url = urlData.publicUrl;

    // Save metadata to media table
    await supabase.from('media').insert({
      filename,
      original_name: file.name,
      url,
      storage_path: filename,
      mime_type: file.type,
      size_bytes: file.size,
    });

    editor.chain().focus().setImage({ src: url, alt: file.name }).run();
  }, [editor]);

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes('link').href || '';
    const url = window.prompt('Enter URL', prev);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return (
      <div className="border border-ink-20 rounded-md min-h-[450px] flex items-center justify-center text-ink-50">
        Loading editor...
      </div>
    );
  }

  const btnClass = (active: boolean) =>
    `px-2.5 py-1.5 text-sm font-semibold rounded transition-colors ${
      active ? 'bg-black text-white' : 'text-black hover:bg-ink-5'
    }`;

  return (
    <div className="border border-ink-20 rounded-md bg-white">
      {/* Toolbar — sticky so it stays visible while scrolling the content.
          If your admin layout has a fixed top bar, change `top-0` to e.g. `top-16`
          so the toolbar parks just below it instead of sliding underneath. */}
      <div className="sticky top-0 z-20 rounded-t-md border-b border-ink-10 bg-[#9CCC65] px-3 py-2 flex flex-wrap items-center gap-1">
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive('heading', { level: 2 }))}>H2</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btnClass(editor.isActive('heading', { level: 3 }))}>H3</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} className={btnClass(editor.isActive('heading', { level: 4 }))}>H4</button>
        <span className="w-px h-5 bg-ink-20 mx-1" />
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive('bold'))}><b>B</b></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive('italic'))}><i>I</i></button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={btnClass(editor.isActive('strike'))}><s>S</s></button>
        <span className="w-px h-5 bg-ink-20 mx-1" />
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive('bulletList'))}>• List</button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive('orderedList'))}>1. List</button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btnClass(editor.isActive('blockquote'))}>&ldquo; Quote</button>
        <span className="w-px h-5 bg-ink-20 mx-1" />
        <button type="button" onClick={setLink} className={btnClass(editor.isActive('link'))}>🔗 Link</button>
        <button type="button" onClick={() => fileInputRef.current?.click()} className={btnClass(false)}>🖼 Image</button>
        <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className={btnClass(false)}>— Divider</button>
        <span className="w-px h-5 bg-ink-20 mx-1" />
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className={btnClass(false)}>↶</button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className={btnClass(false)}>↷</button>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={onFileSelected} className="hidden" />
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      <style jsx global>{`
        .prose-editor h2 { font-size: 1.75rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #000; }
        .prose-editor h3 { font-size: 1.375rem; font-weight: 700; margin-top: 1.25rem; margin-bottom: 0.5rem; color: #000; }
        .prose-editor h4 { font-size: 1.125rem; font-weight: 700; margin-top: 1rem; margin-bottom: 0.5rem; color: #000; }
        .prose-editor p { margin-bottom: 1rem; line-height: 1.7; color: rgba(0,0,0,0.8); }
        .prose-editor ul { list-style: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
        .prose-editor ol { list-style: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
        .prose-editor li { margin-bottom: 0.5rem; line-height: 1.7; color: rgba(0,0,0,0.8); }
        .prose-editor blockquote { border-left: 4px solid #9ccc65; padding-left: 1rem; margin: 1rem 0; font-style: italic; color: rgba(0,0,0,0.7); }
        .prose-editor a { color: #000; text-decoration: underline; text-decoration-color: #9ccc65; text-decoration-thickness: 2px; }
        .prose-editor img { max-width: 100%; height: auto; border-radius: 0.5rem; margin: 1rem 0; }
        .prose-editor hr { border: none; border-top: 1px solid rgba(0,0,0,0.1); margin: 1.5rem 0; }
        .prose-editor strong { font-weight: 700; color: #000; }
        .prose-editor em { font-style: italic; }
        .prose-editor code { background: rgba(90, 213, 60, 0.05); padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-size: 0.875em; }
        .prose-editor p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: rgba(0,0,0,0.4);
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
}