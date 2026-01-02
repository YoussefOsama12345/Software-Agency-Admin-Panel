import { useState } from 'react';
import { Edit, Trash2, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ConfirmDeleteModal } from '@/components/common/ConfirmDeleteModal';
import { cn } from '@/lib/utils';
import { Comment } from './shared';

interface CommentSectionProps {
    comments: Comment[];
    onSendReply: (parentId: number, text: string) => void;
    onDeleteComment: (commentId: number, parentId?: number) => void;
    onUpdateComment: (commentId: number, text: string, parentId?: number) => void;
}

export function CommentSection({ comments, onSendReply, onDeleteComment, onUpdateComment }: CommentSectionProps) {
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyText, setReplyText] = useState('');
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [editText, setEditText] = useState('');

    const startEditing = (comment: Comment) => {
        setEditingCommentId(comment.id);
        setEditText(comment.content);
        setReplyingTo(null);
    };

    const handleReplySubmit = (commentId: number) => {
        if (!replyText.trim()) return;
        onSendReply(commentId, replyText);
        setReplyText('');
        setReplyingTo(null);
    };

    const handleUpdateSubmit = (commentId: number, parentId?: number) => {
        if (!editText.trim()) return;
        onUpdateComment(commentId, editText, parentId);
        setEditingCommentId(null);
        setEditText('');
    };

    const renderComment = (comment: Comment, isReply = false, parentId?: number) => (
        <div key={comment.id} className={cn("flex flex-col gap-2 p-4 rounded-lg", isReply ? "bg-muted/50 ml-12 mt-2" : "bg-muted/30 border")}>
            <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs text-primary shrink-0">
                    {comment.avatar}
                </div>
                <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{comment.author}</p>
                        <span className="text-xs text-muted-foreground">{comment.time}</span>
                    </div>

                    {editingCommentId === comment.id ? (
                        <div className="flex flex-col gap-2 mt-1">
                            <Input
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="h-8 text-sm"
                            />
                            <div className="flex gap-2">
                                <Button size="sm" className="h-7 text-xs" onClick={() => handleUpdateSubmit(comment.id, parentId)}>Save</Button>
                                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setEditingCommentId(null)}>Cancel</Button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-foreground/90">{comment.content}</p>
                    )}

                    <div className="flex items-center gap-4 pt-2">
                        {!editingCommentId && (
                            <>
                                <button className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                                    <ThumbsUp className="h-3 w-3" /> {comment.likes}
                                </button>
                                {!isReply && (
                                    <button
                                        className="text-xs text-muted-foreground hover:text-primary"
                                        onClick={() => {
                                            setReplyingTo(replyingTo === comment.id ? null : comment.id);
                                            setEditingCommentId(null);
                                            setReplyText('');
                                        }}
                                    >
                                        Reply
                                    </button>
                                )}
                                {/* Allow deleting/editing 'You' comments (simulated by author check or just all for demo) */}
                                {(comment.author === 'You' || isReply) && (
                                    <>
                                        <button className="text-xs text-muted-foreground hover:text-primary" onClick={() => startEditing(comment)}>
                                            <Edit className="h-3 w-3" />
                                        </button>
                                        <ConfirmDeleteModal
                                            trigger={
                                                <button className="text-xs text-muted-foreground hover:text-destructive">
                                                    <Trash2 className="h-3 w-3" />
                                                </button>
                                            }
                                            title="Delete Comment"
                                            description="Are you sure you want to delete this comment? This action cannot be undone."
                                            onConfirm={() => onDeleteComment(comment.id, parentId)}
                                            variant="destructive"
                                            confirmText="Delete"
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Reply Input */}
            {!isReply && replyingTo === comment.id && (
                <div className="ml-12 mt-2 flex gap-2 animate-in fade-in slide-in-from-top-2">
                    <Input
                        placeholder={`Reply to ${comment.author}...`}
                        className="h-9 text-sm"
                        autoFocus
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleReplySubmit(comment.id);
                        }}
                    />
                    <Button size="sm" className="h-9" onClick={() => handleReplySubmit(comment.id)}>Send</Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-9"
                        onClick={() => {
                            setReplyingTo(null);
                            setReplyText('');
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            )}

            {/* Nested Replies */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="space-y-2 mt-2">
                    {comment.replies.map(reply => renderComment(reply, true, comment.id))}
                </div>
            )}
        </div>
    );

    return (
        <div className="space-y-4">
            {comments.length > 0 ? (
                comments.map(comment => renderComment(comment))
            ) : (
                <div className="text-center py-8 text-muted-foreground">
                    No comments on this platform yet.
                </div>
            )}
        </div>
    );
}
