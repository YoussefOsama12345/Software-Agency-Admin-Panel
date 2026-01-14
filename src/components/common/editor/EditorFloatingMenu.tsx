'use client';

import { FloatingMenu } from '@tiptap/react/menus';
import { Editor } from '@tiptap/core';
import {
    Heading1,
    Heading2,
    List,
    ListOrdered,
    Quote,
    Code2,
    Image as ImageIcon,
} from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';

interface EditorFloatingMenuProps {
    editor: Editor | null;
}

export function EditorFloatingMenu({ editor }: EditorFloatingMenuProps) {
    if (!editor) return null;

    const items = [
        {
            icon: Heading1,
            action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: () => editor.isActive('heading', { level: 1 }),
            title: 'Heading 1',
        },
        {
            icon: Heading2,
            action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: () => editor.isActive('heading', { level: 2 }),
            title: 'Heading 2',
        },
        {
            icon: List,
            action: () => editor.chain().focus().toggleBulletList().run(),
            isActive: () => editor.isActive('bulletList'),
            title: 'Bullet List',
        },
        {
            icon: ListOrdered,
            action: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: () => editor.isActive('orderedList'),
            title: 'Ordered List',
        },
        {
            icon: Quote,
            action: () => editor.chain().focus().toggleBlockquote().run(),
            isActive: () => editor.isActive('blockquote'),
            title: 'Quote',
        },
        {
            icon: Code2,
            action: () => editor.chain().focus().toggleCodeBlock().run(),
            isActive: () => editor.isActive('codeBlock'),
            title: 'Code Block',
        },
    ];

    return (
        <FloatingMenu
            editor={editor}
            className="flex items-center gap-1 rounded-md border bg-popover p-1 shadow-md"
        >
            {items.map((item, index) => (
                <Toggle
                    key={index}
                    size="sm"
                    pressed={item.isActive()}
                    onPressedChange={item.action}
                    className="h-8 w-8 p-0"
                    title={item.title}
                >
                    <item.icon className="h-4 w-4" />
                </Toggle>
            ))}
        </FloatingMenu>
    );
}
