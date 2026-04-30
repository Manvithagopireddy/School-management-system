import type { ElementType } from 'react';

interface EmptyStateProps {
  icon: ElementType;
  title: string;
  description: string;
}

const EmptyState = ({ icon: Icon, title, description }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
    <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-2">
      <Icon size={36} className="text-muted/30" />
    </div>
    <p className="text-lg font-bold text-white/60">{title}</p>
    <p className="text-sm text-muted max-w-xs leading-relaxed">{description}</p>
  </div>
);

export default EmptyState;
