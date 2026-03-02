import { ConversationLine as ConversationLineType } from '@/data/types';
import SpeakerBadge from './SpeakerBadge';

interface ConversationLineProps {
  line: ConversationLineType;
  showKorean?: boolean;
}

export default function ConversationLine({ line, showKorean = false }: ConversationLineProps) {
  return (
    <div className="flex gap-3 py-3">
      <SpeakerBadge speaker={line.speaker} />
      <div className="flex-1 min-w-0 pt-1">
        <p className="text-base leading-relaxed font-medium text-text">{line.english}</p>
        {showKorean && (
          <p className="text-sm text-text-secondary mt-1">{line.korean}</p>
        )}
      </div>
    </div>
  );
}
