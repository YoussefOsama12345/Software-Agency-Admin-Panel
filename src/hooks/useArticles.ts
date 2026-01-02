import { useState, useEffect } from 'react';
import { Article, CreateArticleFormData } from '@/schemas/article.schema';

const MOCK_ARTICLES: Article[] = [
    {
        id: '1',
        title: '6 Benefits of Teaching Programming to Kids',
        slug: 'benefits-of-teaching-programming-to-kids',
        description: 'Why should kids learn to code? Interest in computer science has grown significantly in recent years...',
        content: 'Full content here...',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
        status: 'PUBLISHED',
        categoryId: 'c1f2a7e4-9b8a-4e6a-b1f3-2c6a5e7f1d21',
        category: { id: 'c1f2a7e4-9b8a-4e6a-b1f3-2c6a5e7f1d21', name: 'Education' },
        tags: ['Programming', 'Kids', 'Education'],
        createdAt: '2024-07-24T10:00:00Z',
        updatedAt: new Date().toISOString(),
        noIndex: false,
        noFollow: false,
    },
    {
        id: '2',
        title: 'The Future of AI in Design',
        slug: 'future-of-ai-design',
        description: 'How Artificial Intelligence is transforming the creative design landscape and what it means for designers.',
        content: 'AI tools are becoming...',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
        status: 'PUBLISHED',
        categoryId: 'a3e9d8c4-1f2b-4a91-8c7d-6e5f9b2a1c34',
        category: { id: 'a3e9d8c4-1f2b-4a91-8c7d-6e5f9b2a1c34', name: 'Design' },
        tags: ['AI', 'Design', 'Future'],
        createdAt: '2024-08-15T09:30:00Z',
        updatedAt: new Date().toISOString(),
        noIndex: false,
        noFollow: false,
    },
    {
        id: '3',
        title: 'Mastering React Server Components',
        slug: 'mastering-react-server-components',
        description: 'A deep dive into the new architecture of React and how to leverage Server Components for performance.',
        content: 'React Server Components...',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
        status: 'DRAFT',
        categoryId: 'c1f2a7e4-9b8a-4e6a-b1f3-2c6a5e7f1d21',
        category: { id: 'c1f2a7e4-9b8a-4e6a-b1f3-2c6a5e7f1d21', name: 'Technology' },
        tags: ['React', 'Next.js', 'Web Dev'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        noIndex: false,
        noFollow: false,
    }
];

export function useArticles() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate API fetch
        const timer = setTimeout(() => {
            setArticles(MOCK_ARTICLES);
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const deleteArticle = async (id: string) => {
        setArticles(prev => prev.filter(article => article.id !== id));
    };

    return {
        articles,
        isLoading,
        deleteArticle
    };
}

export function useArticle(id: string) {
    const [article, setArticle] = useState<Article | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            const found = MOCK_ARTICLES.find(a => a.id === id);
            setArticle(found || null);
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [id]);

    return { article, isLoading };
}

export function useCreateArticle() {
    const createArticle = async (data: CreateArticleFormData) => {
        console.log('Creating article:', data);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: true };
    };
    return { createArticle, isPending: false };
}

export function useUpdateArticle() {
    const updateArticle = async (id: string, data: Partial<CreateArticleFormData>) => {
        console.log('Updating article:', id, data);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { success: true };
    };
    return { updateArticle, isPending: false };
}
