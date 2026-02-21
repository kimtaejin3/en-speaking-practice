'use client';

import { useMemo } from 'react';
import { ConversationLine } from '@/data/types';
import { useDayProgress } from '@/hooks/useProgress';
import { getSentenceAggregateStats } from '@/lib/progress';
import Card from '@/components/ui/Card';

interface SentenceStatsDisplayProps {
  dayId: number;
  conversation: ConversationLine[];
}

export default function SentenceStatsDisplay({ dayId, conversation }: SentenceStatsDisplayProps) {
  const { dayProgress, loading } = useDayProgress(dayId);

  const stats = useMemo(
    () => getSentenceAggregateStats(dayProgress ?? undefined, conversation),
    [dayProgress, conversation]
  );

  const hasAnyStats = stats.some(
    (s) => s.correctCount > 0 || s.incorrectCount > 0 || s.readCount > 0
  );

  if (loading) {
    return (
      <Card>
        <p className="text-center text-text-secondary py-4">로딩 중...</p>
      </Card>
    );
  }

  if (!hasAnyStats) {
    return (
      <Card>
        <h3 className="font-bold mb-3 text-text">문장별 학습 기록</h3>
        <p className="text-sm text-text-secondary text-center py-4">
          아직 학습 기록이 없습니다. 학습을 시작해보세요!
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="font-bold mb-4 text-text">문장별 학습 기록</h3>
      <div className="space-y-0 divide-y divide-border">
        {stats.map((s, i) => {
          const total = s.correctCount + s.incorrectCount;
          const hasAttempt = total > 0 || s.readCount > 0;

          return (
            <div key={i} className={`py-3 ${!hasAttempt ? 'opacity-40' : ''}`}>
              {/* Speaker + Sentence */}
              <div className="flex items-start gap-2.5 mb-2">
                <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                  s.speaker === 'A'
                    ? 'bg-primary-light text-primary border-primary/30'
                    : 'bg-accent-blue/10 text-accent-blue border-accent-blue/30'
                }`}>
                  {s.speaker}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text leading-relaxed">{s.english}</p>
                  <p className="text-xs text-text-secondary mt-0.5">{s.korean}</p>
                </div>
              </div>

              {/* Stats badges */}
              {hasAttempt && (
                <div className="flex gap-2 ml-9.5 flex-wrap">
                  {s.correctCount > 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-success-light text-success-dark">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      정답 {s.correctCount}회
                    </span>
                  )}
                  {s.incorrectCount > 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-error-light text-error-dark">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      오답 {s.incorrectCount}회
                    </span>
                  )}
                  {s.readCount > 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-primary-light text-primary-dark">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
                      </svg>
                      읽기 {s.readCount}회
                    </span>
                  )}
                  {total > 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-bg text-text-secondary border border-border">
                      정답률 {Math.round((s.correctCount / total) * 100)}%
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
