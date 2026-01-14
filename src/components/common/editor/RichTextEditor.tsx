'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import CharacterCount from '@tiptap/extension-character-count';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Youtube from '@tiptap/extension-youtube';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { all, createLowlight } from 'lowlight';
import ImageResize from 'tiptap-extension-resize-image';
import { useEffect, useRef, useState } from 'react';


import { cn } from '@/lib/utils';
import { TooltipProvider } from '@/components/ui/tooltip';

import { FontSize } from './extensions';
import { EditorToolbar } from './EditorToolbar';
import { EditorBubbleMenu } from './EditorBubbleMenu';
import { EditorFloatingMenu } from './EditorFloatingMenu';

const lowlight = createLowlight(all);

interface RichTextEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    dir?: 'ltr' | 'rtl';
    disabled?: boolean;
    autosaveKey?: string;
    maxLength?: number;
}


export function RichTextEditor({
    value = '',
    onChange,
    placeholder = 'Write something...',
    className,
    dir = 'ltr',
    disabled = false,
    autosaveKey,
    maxLength,
}: RichTextEditorProps) {
    const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [stats, setStats] = useState({ characters: 0, words: 0 });

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
                codeBlock: false, // Disable default codeBlock to use lowlight
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-primary underline cursor-pointer',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg my-4',
                },
                allowBase64: true,
            }),
            Placeholder.configure({
                placeholder,
                emptyEditorClass: 'is-editor-empty',
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Underline,
            Highlight.configure({
                multicolor: true,
            }),
            Color,
            TextStyle,
            FontSize,
            FontFamily,
            Subscript,
            Superscript,
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            CharacterCount.configure({
                limit: maxLength,
            }),
            Table.configure({
                resizable: true,
                HTMLAttributes: {
                    class: 'border-collapse w-full my-4 table-fixed',
                },
            }),
            TableRow.configure({
                HTMLAttributes: {
                    class: 'border-b border-border hover:bg-muted/50 transition-colors',
                },
            }),
            TableCell.configure({
                HTMLAttributes: {
                    class: 'border border-border p-2 min-w-[100px] align-top relative',
                },
            }),
            TableHeader.configure({
                HTMLAttributes: {
                    class: 'border border-border p-2 bg-muted font-bold text-left align-top relative',
                },
            }),
            Youtube.configure({
                HTMLAttributes: {
                    class: 'w-full aspect-video rounded-lg my-4',
                },
            }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
            ImageResize,
        ],
        content: value,
        editable: !disabled,
        onCreate: ({ editor }) => {
            setStats({
                characters: editor.storage.characterCount.characters(),
                words: editor.storage.characterCount.words(),
            });
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onChange?.(html);

            setStats({
                characters: editor.storage.characterCount.characters(),
                words: editor.storage.characterCount.words(),
            });

            // Autosave to localStorage
            if (autosaveKey) {
                if (autosaveTimerRef.current) {
                    clearTimeout(autosaveTimerRef.current);
                }
                autosaveTimerRef.current = setTimeout(() => {
                    localStorage.setItem(autosaveKey, html);
                }, 1000);
            }
        },
        editorProps: {
            attributes: {
                class: cn(
                    'prose prose-sm dark:prose-invert max-w-[1000px] min-h-[300px] p-4 focus:outline-none tiptap break-words whitespace-pre-wrap',
                    'prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-foreground',
                    'prose-p:my-1 prose-ul:my-2 prose-ol:my-2 prose-li:my-0 prose-hr:my-4',
                    'prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-1 prose-blockquote:px-4',
                    'prose-code:bg-muted prose-code:rounded prose-code:px-1 prose-code:py-0.5',
                    'prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg',
                    'prose-a:text-primary prose-a:underline hover:prose-a:no-underline',
                    dir === 'rtl' && 'text-right',
                    disabled && 'opacity-50 cursor-not-allowed',
                ),
                dir,
            },
            handleDrop: (view, event, slice, moved) => {
                if (!moved && event.dataTransfer?.files.length) {
                    const file = event.dataTransfer.files[0];
                    if (file.type.startsWith('image/')) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const result = e.target?.result as string;
                            if (result && editor) {
                                editor.chain().focus().setImage({ src: result }).run();
                            }
                        };
                        reader.readAsDataURL(file);
                        return true;
                    }
                }
                return false;
            },
            handlePaste: (view, event) => {
                const items = event.clipboardData?.items;
                if (items) {
                    for (const item of items) {
                        if (item.type.startsWith('image/')) {
                            const file = item.getAsFile();
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    const result = e.target?.result as string;
                                    if (result && editor) {
                                        editor.chain().focus().setImage({ src: result }).run();
                                    }
                                };
                                reader.readAsDataURL(file);
                                return true;
                            }
                        }
                    }
                }
                return false;
            },
        },
    });

    // Load autosaved content on mount
    useEffect(() => {
        if (autosaveKey && editor && !value) {
            const saved = localStorage.getItem(autosaveKey);
            if (saved) {
                editor.commands.setContent(saved);
                setStats({
                    characters: editor.storage.characterCount.characters(),
                    words: editor.storage.characterCount.words(),
                });
            }
        }
    }, [autosaveKey, editor, value]);

    // Update content when value changes from outside
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
            setStats({
                characters: editor.storage.characterCount.characters(),
                words: editor.storage.characterCount.words(),
            });
        }
    }, [value, editor]);

    // Cleanup autosave timer
    useEffect(() => {
        return () => {
            if (autosaveTimerRef.current) {
                clearTimeout(autosaveTimerRef.current);
            }
        };
    }, []);

    if (!editor) {
        return (
            <div className={cn('rounded-md border bg-background animate-pulse', className)}>
                <div className="h-12 border-b bg-muted" />
                <div className="min-h-[300px]" />
            </div>
        );
    }

    return (
        <TooltipProvider>
            <div className={cn(
                'relative flex min-h-[300px] w-full flex-col rounded-md border border-input bg-transparent shadow-sm',
                className
            )}>
                <EditorFloatingMenu editor={editor} />
                <EditorBubbleMenu editor={editor} />
                <EditorToolbar editor={editor} disabled={disabled} />

                {/* Editor Content */}
                <EditorContent editor={editor} />

                {/* Footer with Character/Word Count */}
                <div className="flex items-center justify-between border-t px-4 py-2 text-xs text-muted-foreground">
                    <div className="flex gap-4">
                        <span>{stats.characters} characters</span>
                        <span>{stats.words} words</span>
                        <span>{Math.ceil(stats.words / 200)} min read</span>
                    </div>
                    {maxLength && (
                        <span className={stats.characters > maxLength ? 'text-destructive' : ''}>
                            {stats.characters}/{maxLength}
                        </span>
                    )}
                </div>
            </div>
        </TooltipProvider>
    );
}
