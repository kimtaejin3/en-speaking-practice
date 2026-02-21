'use client';

import { useState, useMemo } from 'react';
import { DayProgress, DayData } from '@/data/types';
import { getSentenceAggregateStats } from '@/lib/progress';
import Card from '@/components/ui/Card';

interface DayProgressCardProps {
  dayData: DayData;
  dayProgress: DayProgress | undefined;
}

export default function DayProgressCard({ dayData, dayProgress }: DayProgressCardProps) {
  const [expanded, setExpanded] = useState(false);

  const hasLineGuessing = dayProgress?.lineGuessing.asA.some((s) => s.correctCount > 0 || s.incorrectCount > 0)
    || dayProgress?.lineGuessing.asB.some((s) => s.correctCount > 0 || s.incorrectCount > 0);
  const hasFullConversation = dayProgress?.fullConversation.sentences.some(
    (s) => s.correctCount > 0 || s.incorrectCount > 0
  );
  const hasReadAlong = dayProgress?.readAlong.sentences.some((s) => s.readCount > 0);

  const stats = useMemo(
    () => expanded ? getSentenceAggregateStats(dayProgress, dayData.conversation) : [],
    [expanded, dayProgress, dayData.conversation]
  );

  return (
    <Card className="!p-0 overflow-hidden">
      {/* Header - clickable */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="w-full text-left p-4 cursor-pointer hover:bg-bg/50 transition-colors"
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-text">Day {dayData.id}</h4>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">{dayData.title}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`text-text-disabled transition-transform ${expanded ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
        <div className="flex gap-2">
          <ModeTag label="빈칸" active={!!hasLineGuessing} />
          <ModeTag label="전체입력" active={!!hasFullConversation} />
          <ModeTag label="따라읽기" active={!!hasReadAlong} />
        </div>
      </button>

      {/* Expanded sentence stats */}
      {expanded && (
        <div className="border-t-2 border-border px-4 pb-4 fade-in">
          <p className="text-xs font-bold text-text-secondary mt-3 mb-2">문장별 학습 기록</p>
          <div className="space-y-0 divide-y divide-border">
            {stats.map((s, i) => {
              const total = s.correctCount + s.incorrectCount;
              const hasAny = total > 0 || s.readCount > 0;

              return (
                <div key={i} className={`py-2.5 ${!hasAny ? 'opacity-40' : ''}`}>
                  <div className="flex items-start gap-2 mb-1.5">
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 ${
                      s.speaker === 'A'
                        ? 'bg-primary-light text-primary border-primary/30'
                        : 'bg-accent-blue/10 text-accent-blue border-accent-blue/30'
                    }`}>
                      {s.speaker}
                    </span>
                    <p className="text-sm text-text leading-relaxed flex-1 min-w-0">{s.english}</p>
                  </div>
                  {hasAny && (
                    <div className="flex gap-1.5 ml-8 flex-wrap">
                      {s.correctCount > 0 && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-success-light text-success-dark">
                          ✓ {s.correctCount}
                        </span>
                      )}
                      {s.incorrectCount > 0 && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-error-light text-error-dark">
                          ✗ {s.incorrectCount}
                        </span>
                      )}
                      {s.readCount > 0 && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-primary-light text-primary-dark">
                          읽기 {s.readCount}
                        </span>
                      )}
                      {total > 0 && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-bg text-text-secondary border border-border">
                          {Math.round((s.correctCount / total) * 100)}%
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
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
