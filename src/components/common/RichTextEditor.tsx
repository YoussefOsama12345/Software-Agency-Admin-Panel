'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import { useEffect, useCallback } from 'react';
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Code,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Minus,
    Undo,
    Redo,
    Link as LinkIcon,
    Image as ImageIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Highlighter,
    Code2,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Toggle } from '@/components/ui/toggle';
import { Separator } from '@/components/ui/separator';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface RichTextEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    dir?: 'ltr' | 'rtl';
    disabled?: boolean;
}

export function RichTextEditor({
    value = '',
    onChange,
    placeholder = 'Write something...',
    className,
    dir = 'ltr',
    disabled = false,
}: RichTextEditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-primary underline',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg',
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Underline,
            Highlight.configure({
                multicolor: true,
            }),
        ],
        content: value,
        editable: !disabled,
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: cn(
                    'prose prose-sm dark:prose-invert max-w-none min-h-[300px] p-4 focus:outline-none',
                    dir === 'rtl' && 'text-right',
                ),
                dir,
            },
        },
    });

    // Update content when value changes from outside
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    const addLink = useCallback(() => {
        if (!editor) return;
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    const addImage = useCallback(() => {
        if (!editor) return;
        const url = window.prompt('Image URL');

        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    const ToolbarButton = ({
        onClick,
        isActive,
        disabled: btnDisabled,
        tooltip,
        children,
    }: {
        onClick: () => void;
        isActive?: boolean;
        disabled?: boolean;
        tooltip: string;
        children: React.ReactNode;
    }) => (
        <Tooltip>
            <TooltipTrigger asChild>
                <Toggle
                    size="sm"
                    pressed={isActive}
                    onPressedChange={onClick}
                    disabled={btnDisabled || disabled}
                    className="h-8 w-8 p-0"
                >
                    {children}
                </Toggle>
            </TooltipTrigger>
            <TooltipContent>
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    );

    return (
        <TooltipProvider>
            <div className={cn('rounded-md border bg-background', className)}>
                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-1 border-b p-2">
                    {/* Text Formatting */}
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        isActive={editor.isActive('bold')}
                        tooltip="Bold"
                    >
                        <Bold className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        isActive={editor.isActive('italic')}
                        tooltip="Italic"
                    >
                        <Italic className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        isActive={editor.isActive('underline')}
                        tooltip="Underline"
                    >
                        <UnderlineIcon className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        isActive={editor.isActive('strike')}
                        tooltip="Strikethrough"
                    >
                        <Strikethrough className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                        isActive={editor.isActive('highlight')}
                        tooltip="Highlight"
                    >
                        <Highlighter className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        isActive={editor.isActive('code')}
                        tooltip="Inline Code"
                    >
                        <Code className="h-4 w-4" />
                    </ToolbarButton>

                    <Separator orientation="vertical" className="mx-1 h-6" />

                    {/* Headings */}
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        isActive={editor.isActive('heading', { level: 1 })}
                        tooltip="Heading 1"
                    >
                        <Heading1 className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        isActive={editor.isActive('heading', { level: 2 })}
                        tooltip="Heading 2"
                    >
                        <Heading2 className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        isActive={editor.isActive('heading', { level: 3 })}
                        tooltip="Heading 3"
                    >
                        <Heading3 className="h-4 w-4" />
                    </ToolbarButton>

                    <Separator orientation="vertical" className="mx-1 h-6" />

                    {/* Lists */}
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        isActive={editor.isActive('bulletList')}
                        tooltip="Bullet List"
                    >
                        <List className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        isActive={editor.isActive('orderedList')}
                        tooltip="Numbered List"
                    >
                        <ListOrdered className="h-4 w-4" />
                    </ToolbarButton>

                    <Separator orientation="vertical" className="mx-1 h-6" />

                    {/* Text Align */}
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        isActive={editor.isActive({ textAlign: 'left' })}
                        tooltip="Align Left"
                    >
                        <AlignLeft className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        isActive={editor.isActive({ textAlign: 'center' })}
                        tooltip="Align Center"
                    >
                        <AlignCenter className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        isActive={editor.isActive({ textAlign: 'right' })}
                        tooltip="Align Right"
                    >
                        <AlignRight className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                        isActive={editor.isActive({ textAlign: 'justify' })}
                        tooltip="Justify"
                    >
                        <AlignJustify className="h-4 w-4" />
                    </ToolbarButton>

                    <Separator orientation="vertical" className="mx-1 h-6" />

                    {/* Block Elements */}
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        isActive={editor.isActive('blockquote')}
                        tooltip="Quote"
                    >
                        <Quote className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        isActive={editor.isActive('codeBlock')}
                        tooltip="Code Block"
                    >
                        <Code2 className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                        tooltip="Horizontal Rule"
                    >
                        <Minus className="h-4 w-4" />
                    </ToolbarButton>

                    <Separator orientation="vertical" className="mx-1 h-6" />

                    {/* Links & Media */}
                    <ToolbarButton
                        onClick={addLink}
                        isActive={editor.isActive('link')}
                        tooltip="Add Link"
                    >
                        <LinkIcon className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={addImage}
                        tooltip="Add Image"
                    >
                        <ImageIcon className="h-4 w-4" />
                    </ToolbarButton>

                    <Separator orientation="vertical" className="mx-1 h-6" />

                    {/* Undo/Redo */}
                    <ToolbarButton
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        tooltip="Undo"
                    >
                        <Undo className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        tooltip="Redo"
                    >
                        <Redo className="h-4 w-4" />
                    </ToolbarButton>
                </div>

                {/* Editor Content */}
                <EditorContent editor={editor} />
            </div>
        </TooltipProvider>
    );
}
