import { DayProgress, DayData } from '@/data/types';
import Card from '@/components/ui/Card';

interface DayProgressCardProps {
  dayData: DayData;
  dayProgress: DayProgress | undefined;
}

export default function DayProgressCard({ dayData, dayProgress }: DayProgressCardProps) {
  const hasLineGuessing = dayProgress?.lineGuessing.asA.some((s) => s.correctCount > 0 || s.incorrectCount > 0)
    || dayProgress?.lineGuessing.asB.some((s) => s.correctCount > 0 || s.incorrectCount > 0);
  const hasFullConversation = dayProgress?.fullConversation.sentences.some(
    (s) => s.correctCount > 0 || s.incorrectCount > 0
  );
  const hasReadAlong = dayProgress?.readAlong.sentences.some((s) => s.readCount > 0);
  const totalReads = dayProgress?.readAlong.sentences.reduce((sum, s) => sum + s.readCount, 0) ?? 0;

  return (
    <Card className="!p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-text">Day {dayData.id}</h4>
        <span className="text-sm text-text-secondary">{dayData.title}</span>
      </div>
      <div className="flex gap-2">
        <ModeTag label="빈칸" active={!!hasLineGuessing} />
        <ModeTag label="전체입력" active={!!hasFullConversation} />
        <ModeTag label="따라읽기" active={!!hasReadAlong} />
      </div>
      {hasReadAlong && (
        <p className="text-xs text-text-secondary mt-2 font-medium">
          총 {totalReads}회 읽기
        </p>
      )}
    </Card>
  );
}

function ModeTag({ label, active }: { label: string; active: boolean }) {
  return (
    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
      active
        ? 'bg-success-light text-success-dark'
        : 'bg-bg text-text-disabled border border-border'
    }`}>
      {active ? '✓ ' : ''}{label}
    </span>
  );
}
