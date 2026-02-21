import { ConversationLine as ConversationLineType } from '@/data/types';

interface ConversationLineProps {
  line: ConversationLineType;
  showKorean?: boolean;
}

export default function ConversationLine({ line, showKorean = false }: ConversationLineProps) {
  return (
    <div className="flex gap-3 py-3">
      <span className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
        line.speaker === 'A'
          ? 'bg-primary-light text-primary border-primary/30'
          : 'bg-accent-blue/10 text-accent-blue border-accent-blue/30'
      }`}>
        {line.speaker}
      </span>
      <div className="flex-1 min-w-0 pt-1">
        <p className="text-base leading-relaxed font-medium text-text">{line.english}</p>
        {showKorean && (
          <p className="text-sm text-text-secondary mt-1">{line.korean}</p>
        )}
      </div>
    </div>
  );
}
