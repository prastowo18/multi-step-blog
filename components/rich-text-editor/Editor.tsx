/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';

import { MenuBar } from './MenuBar';

export function RichTextEditor({ field }: { field: any }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'min-h-[300px] p-4 focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert !w-full !max-w-none',
      },
    },
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },

    content: field.value ? JSON.parse(field.value) : '<p>Hello World</p>',
    immediatelyRender: false,
  });

  return (
    <div className="w-full border border-input rounded-lg overflow-hidden dark:bg-input/30">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
