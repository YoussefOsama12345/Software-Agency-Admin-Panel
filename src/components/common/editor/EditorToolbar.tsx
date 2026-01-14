'use client';

import { Editor } from '@tiptap/core';
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
    Subscript as SubscriptIcon,
    Superscript as SuperscriptIcon,
    ListTodo,
    ChevronDown,
    Type,
    Table as TableIcon,
    Palette,
    Youtube as YoutubeIcon,
    RemoveFormatting,
} from 'lucide-react';
import { useState, useRef } from 'react';

import { Toggle } from '@/components/ui/toggle';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LinkComponent } from './LinkComponent';
import { FONT_SIZES, TEXT_COLORS, HIGHLIGHT_COLORS } from './constants';

interface EditorToolbarProps {
    editor: Editor | null;
    disabled?: boolean;
}

export function EditorToolbar({ editor, disabled }: EditorToolbarProps) {
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [linkText, setLinkText] = useState('');
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [isYoutubeOpen, setIsYoutubeOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!editor) return null;

    const setFontSize = (size: string) => {
        editor.chain().focus().setMark('textStyle', { fontSize: size }).run();
    };

    const setTextColor = (color: string) => {
        if (color === 'inherit') {
            editor.chain().focus().unsetColor().run();
        } else {
            editor.chain().focus().setColor(color).run();
        }
    };

    const setHighlightColor = (color: string) => {
        editor.chain().focus().toggleHighlight({ color }).run();
    };

    const addLink = () => {
        const { from, to } = editor.state.selection;
        const selectedText = editor.state.doc.textBetween(from, to);
        const previousUrl = editor.getAttributes('link').href;

        setLinkUrl(previousUrl || '');
        setLinkText(selectedText || '');
        setIsLinkModalOpen(true);
    };

    const handleLinkSave = (url: string, text: string) => {
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
        } else {
            const displayText = text || url;
            editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .insertContent(`<a href="${url}">${displayText}</a>`)
                .run();
        }
        setIsLinkModalOpen(false);
        setLinkUrl('');
        setLinkText('');
    };

    const addImage = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            if (result) {
                editor.chain().focus().setImage({ src: result }).run();
            }
        };
        reader.readAsDataURL(file);
        event.target.value = '';
    };

    const addYoutubeVideo = () => {
        if (!youtubeUrl) return;
        editor.commands.setYoutubeVideo({ src: youtubeUrl });
        setYoutubeUrl('');
        setIsYoutubeOpen(false);
    };

    const insertTable = () => {
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    };

    const clearFormatting = () => {
        editor.chain().focus().clearNodes().unsetAllMarks().run();
    };

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
                    className="h-8 w-8 p-0 shrink-0"
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
            <div className="flex flex-wrap items-center gap-2 border-b p-2">
                {/* Font Styles Group */}
                <div className="flex items-center gap-1">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 shrink-0" disabled={disabled}>
                                <Type className="h-4 w-4" />
                                <ChevronDown className="h-3 w-3" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {FONT_SIZES.map((size) => (
                                <DropdownMenuItem key={size.value} onClick={() => setFontSize(size.value)}>
                                    <span style={{ fontSize: size.value }}>{size.label}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0" disabled={disabled}>
                                <Palette className="h-4 w-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-2">
                            <div className="grid grid-cols-5 gap-1">
                                {TEXT_COLORS.map((color) => (
                                    <button
                                        key={color.value}
                                        className="h-6 w-6 rounded border border-border hover:scale-110 transition-transform"
                                        style={{ backgroundColor: color.value === 'inherit' ? 'transparent' : color.value }}
                                        onClick={() => setTextColor(color.value)}
                                        title={color.label}
                                    />
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0" disabled={disabled}>
                                <Highlighter className="h-4 w-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-2">
                            <div className="grid grid-cols-3 gap-1">
                                {HIGHLIGHT_COLORS.map((color) => (
                                    <button
                                        key={color.value}
                                        className="h-6 w-6 rounded border border-border hover:scale-110 transition-transform"
                                        style={{ backgroundColor: color.value }}
                                        onClick={() => setHighlightColor(color.value)}
                                        title={color.label}
                                    />
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

                {/* Text Formatting Group */}
                <div className="flex items-center gap-1">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        isActive={editor.isActive('bold')}
                        tooltip="Bold (Ctrl+B)"
                    >
                        <Bold className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        isActive={editor.isActive('italic')}
                        tooltip="Italic (Ctrl+I)"
                    >
                        <Italic className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        isActive={editor.isActive('underline')}
                        tooltip="Underline (Ctrl+U)"
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
                        onClick={() => editor.chain().focus().toggleSubscript().run()}
                        isActive={editor.isActive('subscript')}
                        tooltip="Subscript"
                    >
                        <SubscriptIcon className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleSuperscript().run()}
                        isActive={editor.isActive('superscript')}
                        tooltip="Superscript"
                    >
                        <SuperscriptIcon className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        isActive={editor.isActive('code')}
                        tooltip="Inline Code"
                    >
                        <Code className="h-4 w-4" />
                    </ToolbarButton>
                </div>

                <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

                {/* Headings Group */}
                <div className="flex items-center gap-1">
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
                </div>

                <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

                {/* Lists Group */}
                <div className="flex items-center gap-1">
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
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleTaskList().run()}
                        isActive={editor.isActive('taskList')}
                        tooltip="Task List"
                    >
                        <ListTodo className="h-4 w-4" />
                    </ToolbarButton>
                </div>

                <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

                {/* Alignment Group */}
                <div className="flex items-center gap-1">
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
                </div>

                <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

                {/* Blocks Group */}
                <div className="flex items-center gap-1">
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
                </div>

                <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

                {/* Insert Group */}
                <div className="flex items-center gap-1">
                    <ToolbarButton
                        onClick={insertTable}
                        isActive={editor.isActive('table')}
                        tooltip="Insert Table"
                    >
                        <TableIcon className="h-4 w-4" />
                    </ToolbarButton>

                    <ToolbarButton
                        onClick={addLink}
                        isActive={editor.isActive('link')}
                        tooltip="Add Link (Ctrl+K)"
                    >
                        <LinkIcon className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={addImage}
                        tooltip="Add Image"
                    >
                        <ImageIcon className="h-4 w-4" />
                    </ToolbarButton>

                    <Popover open={isYoutubeOpen} onOpenChange={setIsYoutubeOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0" disabled={disabled}>
                                <YoutubeIcon className="h-4 w-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="space-y-2">
                                <Label>YouTube URL</Label>
                                <Input
                                    placeholder="https://youtube.com/watch?v=..."
                                    value={youtubeUrl}
                                    onChange={(e) => setYoutubeUrl(e.target.value)}
                                />
                                <Button size="sm" onClick={addYoutubeVideo} className="w-full">
                                    Embed Video
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

                {/* History Group */}
                <div className="flex items-center gap-1">
                    <ToolbarButton
                        onClick={clearFormatting}
                        tooltip="Clear Formatting"
                    >
                        <RemoveFormatting className="h-4 w-4" />
                    </ToolbarButton>

                    <ToolbarButton
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        tooltip="Undo (Ctrl+Z)"
                    >
                        <Undo className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        tooltip="Redo (Ctrl+Y)"
                    >
                        <Redo className="h-4 w-4" />
                    </ToolbarButton>
                </div>

                {/* Hidden File Input for Image Upload */}
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                {/* Link Modal Component */}
                <LinkComponent
                    isOpen={isLinkModalOpen}
                    initialUrl={linkUrl}
                    initialText={linkText}
                    onClose={() => setIsLinkModalOpen(false)}
                    onSave={handleLinkSave}
                />
            </div>
        </TooltipProvider>
    );
}
