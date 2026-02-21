import { ConversationLine as ConversationLineType } from '@/data/types';
import ConversationLine from './ConversationLine';

interface ConversationDisplayProps {
  lines: ConversationLineType[];
  showKorean?: boolean;
}

export default function ConversationDisplay({ lines, showKorean = false }: ConversationDisplayProps) {
  return (
    <div className="divide-y divide-border">
      {lines.map((line, index) => (
        <ConversationLine key={index} line={line} showKorean={showKorean} />
      ))}
    </div>
  );
}
