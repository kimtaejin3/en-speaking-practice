'use client';

import { useState, useMemo, useRef, useCallback } from 'react';
import { DayData } from '@/data/types';
import { checkAnswer } from '@/lib/utils';
import { BLUR_REVEAL_THRESHOLD } from '@/data/constants';
import { useDayProgress } from '@/hooks/useProgress';
import UnderlineInput from '@/components/ui/UnderlineInput';
import Button from '@/components/ui/Button';

interface LineGuessingGameProps {
  dayData: DayData;
  role: 'A' | 'B';
}

export default function LineGuessingGame({ dayData, role }: LineGuessingGameProps) {
  const { recordAttempt } = useDayProgress(dayData.id);
  const [answers, setAnswers] = useState<string[]>(() =>
    dayData.conversation.map(() => '')
  );
  const [failCounts, setFailCounts] = useState<number[]>(() =>
    dayData.conversation.map(() => 0)
  );
  const [completedIndexes, setCompletedIndexes] = useState<Set<number>>(new Set());
  const [shakingIndex, setShakingIndex] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const myIndexes = useMemo(
    () => dayData.conversation
      .map((line, i) => (line.speaker === role ? i : -1))
      .filter((i) => i !== -1),
    [dayData.conversation, role]
  );

  const allMyCompleted = useMemo(
    () => myIndexes.every((i) => completedIndexes.has(i)),
    [myIndexes, completedIndexes]
  );

  const roleKey = role === 'A' ? 'asA' as const : 'asB' as const;

  const handleSubmitLine = useCallback((index: number) => {
    const answer = answers[index].trim();
    if (answer === '') return;

    const sentenceIdx = myIndexes.indexOf(index);
    const isCorrect = checkAnswer(answer, dayData.conversation[index].english);

    // Record attempt to server
    recordAttempt('lineGuessing', sentenceIdx, isCorrect, roleKey);

    if (isCorrect) {
      setCompletedIndexes((prev) => {
        const next = new Set(prev);
        next.add(index);
        return next;
      });
      // Focus next uncompleted
      const nextIndex = myIndexes.find((mi) => mi > index && !completedIndexes.has(mi));
      if (nextIndex !== undefined) {
        setTimeout(() => inputRefs.current[nextIndex]?.focus(), 100);
      }
    } else {
      // Shake animation
      setShakingIndex(index);
      setTimeout(() => setShakingIndex(null), 400);

      // Increment fail count
      setFailCounts((prev) => {
        const next = [...prev];
        next[index]++;
        return next;
      });

      // Clear input for retry
      setAnswers((prev) => {
        const next = [...prev];
        next[index] = '';
        return next;
      });

      // Re-focus the same input
      setTimeout(() => inputRefs.current[index]?.focus(), 100);
    }
  }, [answers, dayData.conversation, myIndexes, roleKey, completedIndexes, recordAttempt]);

  const handleAnswerChange = useCallback((index: number, value: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }, []);

  const correctCount = completedIndexes.size;

  return (
    <div>
      <div className="divide-y divide-border">
        {dayData.conversation.map((line, index) => {
          const isMyLine = line.speaker === role;
          const isCompleted = completedIndexes.has(index);
          const fails = failCounts[index];
          const isKoreanRevealed = fails >= BLUR_REVEAL_THRESHOLD;
          const isShaking = shakingIndex === index;

          return (
            <div key={index} className="flex gap-3 py-4">
              <span className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                line.speaker === 'A'
                  ? 'bg-primary-light text-primary border-primary/30'
                  : 'bg-accent-blue/10 text-accent-blue border-accent-blue/30'
              }`}>
                {line.speaker}
              </span>
              <div className="flex-1 min-w-0 pt-0.5">
                {isMyLine ? (
                  <div>
                    {/* Korean hint: blurred until threshold */}
                    <p className={`text-sm text-text-secondary mb-2 ${
                      isCompleted || isKoreanRevealed ? '' : 'blur-hint'
                    }`}>
                      {line.korean}
                    </p>

                    {isCompleted ? (
                      <div className="fade-in">
                        <p className="text-base font-medium text-success">{line.english}</p>
                        <div className="mt-1 inline-block px-2 py-0.5 bg-success-light rounded-lg">
                          <span className="text-xs font-bold text-success-dark">
                            {fails === 0 ? '한 번에 정답!' : `${fails}회 시도 후 정답`}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className={isShaking ? 'shake' : ''}>
                        <div className="flex gap-2 items-end">
                          <div className="flex-1">
                            <UnderlineInput
                              ref={(el) => { inputRefs.current[index] = el; }}
                              value={answers[index]}
                              onChange={(e) => handleAnswerChange(index, e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSubmitLine(index);
                              }}
                              status={isShaking ? 'incorrect' : 'default'}
                              placeholder="영어 문장을 입력하세요"
                            />
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleSubmitLine(index)}
                            disabled={answers[index].trim() === ''}
                          >
                            확인
                          </Button>
                        </div>
                        {fails > 0 && (
                          <p className="text-xs text-error mt-1.5 fade-in">
                            {fails}회 오답 {fails < BLUR_REVEAL_THRESHOLD && `(${BLUR_REVEAL_THRESHOLD - fails}회 더 틀리면 힌트 공개)`}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <p className="text-base leading-relaxed font-medium text-text">{line.english}</p>
                    <p className="text-sm text-text-secondary mt-1">{line.korean}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {allMyCompleted && (
        <div className="text-center py-8 fade-in">
          <div className="text-4xl mb-3">{correctCount === myIndexes.length ? '🎉' : '💪'}</div>
          <p className="text-xl font-bold text-primary mb-1">학습 완료!</p>
          <p className="text-text-secondary font-medium">
            {myIndexes.length}문장 중 {myIndexes.filter((i) => failCounts[i] === 0).length}문장 한 번에 정답
          </p>
        </div>
      )}
    </div>
  );
}
