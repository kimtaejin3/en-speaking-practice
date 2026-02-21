'use client';

import { useState, useCallback, useMemo } from 'react';
import { DayData } from '@/data/types';
import { useDayProgress } from '@/hooks/useProgress';
import Button from '@/components/ui/Button';

interface ReadAlongCounterProps {
  dayData: DayData;
}

export default function ReadAlongCounter({ dayData }: ReadAlongCounterProps) {
  const { dayProgress, recordRead } = useDayProgress(dayData.id);
  const [bumpingIndex, setBumpingIndex] = useState<number | null>(null);

  const sentenceCounts = useMemo(
    () => dayData.conversation.map((_, i) =>
      dayProgress?.readAlong.sentences[i]?.readCount ?? 0
    ),
    [dayData.conversation, dayProgress]
  );

  const totalCount = sentenceCounts.reduce((sum, c) => sum + c, 0);

  const handleReadLine = useCallback((index: number) => {
    recordRead(index);
    setBumpingIndex(index);
    setTimeout(() => setBumpingIndex(null), 300);
  }, [recordRead]);

  const handleReadAll = useCallback(() => {
    dayData.conversation.forEach((_, i) => recordRead(i));
    setBumpingIndex(-1);
    setTimeout(() => setBumpingIndex(null), 300);
  }, [dayData.conversation, recordRead]);

  return (
    <div>
      <div className="divide-y divide-border">
        {dayData.conversation.map((line, index) => (
          <div key={index} className="flex items-start gap-3 py-3">
            <span className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
              line.speaker === 'A'
                ? 'bg-primary-light text-primary border-primary/30'
                : 'bg-accent-blue/10 text-accent-blue border-accent-blue/30'
            }`}>
              {line.speaker}
            </span>
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-base font-medium text-text leading-relaxed">{line.english}</p>
              <p className="text-sm text-text-secondary mt-0.5">{line.korean}</p>
            </div>
            <button
              onClick={() => handleReadLine(index)}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-light text-primary text-sm font-bold hover:bg-primary/15 transition-colors cursor-pointer active:scale-95"
            >
              <span className={bumpingIndex === index ? 'count-bump' : ''}>
                {sentenceCounts[index]}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-text-secondary text-sm font-bold mb-2">총 읽기 횟수</p>
        <p className={`text-6xl font-bold text-primary mb-6 ${bumpingIndex === -1 ? 'count-bump' : ''}`}>
          {totalCount}
        </p>
        <Button size="lg" onClick={handleReadAll} className="w-full max-w-xs">
          전체 읽기 완료
        </Button>
      </div>
    </div>
  );
}
