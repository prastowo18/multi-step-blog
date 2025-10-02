'use client';

import { useMemo } from 'react';
import parse from 'html-react-parser';

import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import { type JSONContent } from '@tiptap/react';
import TextAlign from '@tiptap/extension-text-align';

export function RenderDescription({ json }: { json: JSONContent }) {
  const outPut = useMemo(() => {
    return generateHTML(json, [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ]);
  }, [json]);

  return (
    <div className="prose dark:prose-invert prose-li:marker:text-primary max-w-[1000px] w-full">
      {parse(outPut)}
    </div>
  );
}
