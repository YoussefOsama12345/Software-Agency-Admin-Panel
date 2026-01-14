'use client';

import { BubbleMenu } from '@tiptap/react/menus';
import { Editor } from '@tiptap/core';
import {
    BetweenHorizontalStart,
    BetweenHorizontalEnd,
    BetweenVerticalStart,
    BetweenVerticalEnd,
    Trash2,
    Merge,
    Split,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Toggle } from '@/components/ui/toggle';

interface EditorBubbleMenuProps {
    editor: Editor | null;
}

const ToolbarButton = ({
    onClick,
    tooltip,
    children,
}: {
    onClick: () => void;
    tooltip: string;
    children: React.ReactNode;
}) => (
    <Tooltip>
        <TooltipTrigger asChild>
            <Toggle
                size="sm"
                onPressedChange={onClick}
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

export function EditorBubbleMenu({ editor }: EditorBubbleMenuProps) {
    if (!editor) return null;

    return (
        <BubbleMenu
            editor={editor}
            shouldShow={({ editor }: { editor: Editor }) => editor.isActive('table')}
            className="flex items-center gap-1 rounded-md border bg-popover p-1 shadow-md"
        >
            <TooltipProvider>
                <ToolbarButton
                    onClick={() => editor.chain().focus().addColumnBefore().run()}
                    tooltip="Add Column Before"
                >
                    <BetweenVerticalStart className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().addColumnAfter().run()}
                    tooltip="Add Column After"
                >
                    <BetweenVerticalEnd className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().deleteColumn().run()}
                    tooltip="Delete Column"
                >
                    <Trash2 className="h-4 w-4 text-destructive" />
                </ToolbarButton>
                <Separator orientation="vertical" className="mx-1 h-6" />
                <ToolbarButton
                    onClick={() => editor.chain().focus().addRowBefore().run()}
                    tooltip="Add Row Before"
                >
                    <BetweenHorizontalStart className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().addRowAfter().run()}
                    tooltip="Add Row After"
                >
                    <BetweenHorizontalEnd className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().deleteRow().run()}
                    tooltip="Delete Row"
                >
                    <Trash2 className="h-4 w-4 text-destructive" />
                </ToolbarButton>
                <Separator orientation="vertical" className="mx-1 h-6" />
                <ToolbarButton
                    onClick={() => editor.chain().focus().mergeCells().run()}
                    tooltip="Merge Cells"
                >
                    <Merge className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().splitCell().run()}
                    tooltip="Split Cell"
                >
                    <Split className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().deleteTable().run()}
                    tooltip="Delete Table"
                >
                    <Trash2 className="h-4 w-4 text-destructive" />
                </ToolbarButton>
            </TooltipProvider>
        </BubbleMenu>
    );
}
