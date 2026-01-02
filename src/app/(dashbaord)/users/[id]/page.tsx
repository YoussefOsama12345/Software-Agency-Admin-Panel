import { use } from 'react';

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    return <div>User Detail Page: {id}</div>;
}