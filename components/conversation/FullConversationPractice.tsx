'use client';

import { useState, useMemo, useRef, useCallback } from 'react';
import { DayData } from '@/data/types';
import { checkAnswer } from '@/lib/utils';
import { useDayProgress } from '@/hooks/useProgress';
import UnderlineInput from '@/components/ui/UnderlineInput';
import RevealButton from '@/components/ui/RevealButton';
import Button from '@/components/ui/Button';

interface FullConversationPracticeProps {
  dayData: DayData;
}

type LineStatus = 'pending' | 'correct' | 'incorrect';

export default function FullConversationPractice({ dayData }: FullConversationPracticeProps) {
  const { recordAttempt, completeFullConversation } = useDayProgress(dayData.id);
  const [answers, setAnswers] = useState<string[]>(() =>
    dayData.conversation.map(() => '')
  );
  const [submittedIndexes, setSubmittedIndexes] = useState<Set<number>>(new Set());
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const lineStatuses = useMemo((): LineStatus[] => {
    return dayData.conversation.map((line, i) => {
      if (!submittedIndexes.has(i)) return 'pending';
      return checkAnswer(answers[i], line.english) ? 'correct' : 'incorrect';
    });
  }, [dayData.conversation, answers, submittedIndexes]);

  const allSubmitted = submittedIndexes.size === dayData.conversation.length;
  const correctCount = lineStatuses.filter((s) => s === 'correct').length;

  const handleSubmitLine = useCallback((index: number) => {
    if (answers[index].trim() === '') return;

    const isCorrect = checkAnswer(answers[index], dayData.conversation[index].english);

    // Record per-sentence attempt
    recordAttempt('fullConversation', index, isCorrect);

    const newSubmitted = new Set(submittedIndexes);
    newSubmitted.add(index);
    setSubmittedIndexes(newSubmitted);

    // If all submitted, mark completion
    if (newSubmitted.size === dayData.conversation.length) {
      completeFullConversation();
    }

    // Focus next unanswered input
    const nextIndex = dayData.conversation.findIndex((_, i) => i > index && !newSubmitted.has(i));
    if (nextIndex !== -1) {
      inputRefs.current[nextIndex]?.focus();
    }
  }, [answers, submittedIndexes, dayData.conversation, recordAttempt, completeFullConversation]);

  const handleAnswerChange = useCallback((index: number, value: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }, []);

  return (
    <div>
      <div className="mb-4">
        <RevealButton label="💡 대표 표현 보기">
          <div className="p-3 bg-primary-light rounded-xl border-2 border-primary/20">
            <p className="font-bold text-primary">{dayData.representativeExpression.english}</p>
            <p className="text-text-secondary mt-1">{dayData.representativeExpression.korean}</p>
          </div>
        </RevealButton>
      </div>

      <div className="divide-y divide-border">
        {dayData.conversation.map((line, index) => {
          const status = lineStatuses[index];
          const isSubmitted = submittedIndexes.has(index);

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
                <p className="text-sm text-text-secondary mb-2">{line.korean}</p>
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <UnderlineInput
                      ref={(el) => { inputRefs.current[index] = el; }}
                      value={answers[index]}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !isSubmitted) {
                          handleSubmitLine(index);
                        }
                      }}
                      status={status === 'correct' ? 'correct' : status === 'incorrect' ? 'incorrect' : 'default'}
                      disabled={isSubmitted}
                      placeholder="영어 문장을 입력하세요"
                    />
                  </div>
                  {!isSubmitted && (
                    <Button
                      size="sm"
                      onClick={() => handleSubmitLine(index)}
                      disabled={answers[index].trim() === ''}
                    >
                      확인
                    </Button>
                  )}
                </div>
                {isSubmitted && status === 'incorrect' && (
                  <div className="mt-2 p-2 bg-error-light rounded-xl fade-in">
                    <p className="text-sm font-medium text-error-dark">정답: {line.english}</p>
                  </div>
                )}
                {isSubmitted && status === 'correct' && (
                  <div className="mt-2 p-2 bg-success-light rounded-xl fade-in">
                    <p className="text-sm font-bold text-success-dark">정답!</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {allSubmitted && (
        <div className="text-center py-8 fade-in">
          <div className="text-4xl mb-3">{correctCount === dayData.conversation.length ? '🎉' : '💪'}</div>
          <p className="text-xl font-bold text-primary mb-1">전체 대화 입력 완료!</p>
          <p className="text-text-secondary font-medium">
            {correctCount}/{dayData.conversation.length} 정답
          </p>
        </div>
      )}
    </div>
  );
}
