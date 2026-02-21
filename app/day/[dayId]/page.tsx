import { notFound } from 'next/navigation';
import { getDayData } from '@/data/days';
import PageContainer from '@/components/layout/PageContainer';
import Card from '@/components/ui/Card';
import ConversationDisplay from '@/components/conversation/ConversationDisplay';
import SentenceStatsDisplay from '@/components/conversation/SentenceStatsDisplay';
import ModeSelector from '@/components/day/ModeSelector';

interface DayPageProps {
  params: Promise<{ dayId: string }>;
}

export default async function DayPage({ params }: DayPageProps) {
  const { dayId: dayIdStr } = await params;
  const dayId = parseInt(dayIdStr, 10);
  const dayData = getDayData(dayId);

  if (!dayData) notFound();

  return (
    <PageContainer>
      <Card className="mb-6 !border-primary/30 !bg-primary-lighter">
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs font-bold bg-primary text-white rounded-full">
            대표 표현
          </span>
        </div>
        <p className="text-xl font-bold text-text mb-1">{dayData.representativeExpression.english}</p>
        <p className="text-text-secondary font-medium mb-3">{dayData.representativeExpression.korean}</p>
        <p className="text-sm text-text-secondary leading-relaxed">{dayData.representativeExpression.explanation}</p>
      </Card>

      <Card className="mb-6">
        <h3 className="font-bold mb-3 text-text">대화 미리보기</h3>
        <ConversationDisplay lines={dayData.conversation} showKorean />
      </Card>

      <div className="mb-6">
        <SentenceStatsDisplay dayId={dayId} conversation={dayData.conversation} />
      </div>

      <h3 className="font-bold mb-3 text-text">학습 모드 선택</h3>
      <ModeSelector dayId={dayId} />
    </PageContainer>
  );
}
