import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Platform } from '@/schemas/social.schema';
import { platformIcons, platformColors } from './shared';

interface PlatformSelectorProps {
    platforms: Platform[];
    selectedPlatform: Platform | 'overview';
    onSelect: (platform: Platform | 'overview') => void;
}

export function PlatformSelector({ platforms, selectedPlatform, onSelect }: PlatformSelectorProps) {
    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {platforms.map((p) => {
                const Icon = platformIcons[p];
                const isSelected = selectedPlatform === p;
                const colorClass = platformColors[p];

                return (
                    <Button
                        key={p}
                        variant={isSelected ? 'default' : 'outline'}
                        className={cn(
                            "gap-2 h-10 px-4 rounded-full transition-all border",
                            isSelected
                                ? `${colorClass} border-transparent hover:${colorClass} text-white`
                                : "hover:bg-muted"
                        )}
                        onClick={() => onSelect(p)}
                    >
                        <Icon className="h-4 w-4" />
                        <span className="capitalize">{p}</span>
                    </Button>
                );
            })}
        </div>
    );
}
