'use client';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmDeleteModalProps {
    onConfirm: () => void | Promise<void>;
    trigger: React.ReactNode;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    disabled?: boolean;
    isDeleting?: boolean;
    variant?: "destructive" | "default";
}

export function ConfirmDeleteModal({
    onConfirm,
    trigger,
    title = "Delete Item",
    description = "Are you sure you want to delete this item? This action cannot be undone.",
    confirmText = "Delete",
    cancelText = "Cancel",
    disabled = false,
    isDeleting = false,
    variant = "destructive",
}: ConfirmDeleteModalProps) {
    const handleConfirm = async (e: React.MouseEvent) => {
        e.preventDefault();
        await onConfirm();
    };

    return (
        <Dialog>
            <DialogTrigger asChild disabled={disabled || isDeleting}>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-6 text-center">
                <div className="flex flex-col items-center gap-2">
                    <div className={cn(
                        "rounded-full p-3 mb-2",
                        variant === "destructive" ? "bg-red-100 text-red-600" : "bg-primary/10 text-primary"
                    )}>
                        {variant === "destructive" ? (
                            <AlertTriangle className="h-6 w-6" />
                        ) : (
                            <Trash2 className="h-6 w-6" />
                        )}
                    </div>

                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-center">
                            {title}
                        </DialogTitle>
                        <DialogDescription className="text-center text-muted-foreground pt-2">
                            {description}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex w-full items-center justify-center gap-2 pt-4">
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                disabled={disabled || isDeleting}
                                className="flex-1"
                            >
                                {cancelText}
                            </Button>
                        </DialogClose>
                        <Button
                            variant={variant === "destructive" ? "destructive" : "default"}
                            onClick={handleConfirm}
                            disabled={disabled || isDeleting}
                            className="flex-1"
                        >
                            {isDeleting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                confirmText
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
