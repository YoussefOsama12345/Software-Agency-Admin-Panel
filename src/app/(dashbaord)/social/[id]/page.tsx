import ViewPostClient from '@/components/social/ViewPostClient';

export default async function ViewPostPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    return <ViewPostClient id={resolvedParams.id} />;
}
