'use client';

import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface LinkComponentProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (url: string, text: string) => void;
    initialUrl: string;
    initialText: string;
}

export function LinkComponent({
    isOpen,
    onClose,
    onSave,
    initialUrl,
    initialText,
}: LinkComponentProps) {
    const [url, setUrl] = useState(initialUrl);
    const [text, setText] = useState(initialText);

    useEffect(() => {
        if (isOpen) {
            setUrl(initialUrl);
            setText(initialText);
        }
    }, [isOpen, initialUrl, initialText]);

    const handleSave = () => {
        onSave(url, text);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Insert Link</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <label htmlFor="text" className="text-sm font-medium">Text to display</label>
                        <Input
                            id="text"
                            placeholder="Link text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="link" className="text-sm font-medium">Link URL</label>
                        <Input
                            id="link"
                            placeholder="https://example.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSave();
                                }
                            }}
                            autoFocus
                        />
                    </div>
                </div>
                <DialogFooter className="sm:justify-end">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleSave}>
                        Save Link
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

