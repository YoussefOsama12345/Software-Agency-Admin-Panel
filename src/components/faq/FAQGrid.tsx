import { FAQ } from './FAQCard';
import { FAQCard } from './FAQCard';

interface FAQGridProps {
    faqs: FAQ[];
}

export function FAQGrid({ faqs }: FAQGridProps) {
    if (faqs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground">No FAQs found</p>
                <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your filters or create a new FAQ
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {faqs.map((faq) => (
                <FAQCard key={faq.id} faq={faq} />
            ))}
        </div>
    );
}
