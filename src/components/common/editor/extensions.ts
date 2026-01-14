import { TextStyle } from '@tiptap/extension-text-style';

export const FontSize = TextStyle.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            fontSize: {
                default: null,
                parseHTML: (element: HTMLElement) => element.style.fontSize || null,
                renderHTML: (attributes: Record<string, string>) => {
                    if (!attributes.fontSize) return {};
                    return { style: `font-size: ${attributes.fontSize}` };
                },
            },
        };
    },
});
