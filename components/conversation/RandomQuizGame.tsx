'use client';

import { useState, useRef, useCallback } from 'react';
import { ConversationPair } from '@/data/days/index';
import { checkAnswer } from '@/lib/utils';
import { BLUR_REVEAL_THRESHOLD } from '@/data/constants';
import useSpeechRecognition from '@/hooks/useSpeechRecognition';
import UnderlineInput from '@/components/ui/UnderlineInput';
import Button from '@/components/ui/Button';
import MicButton from '@/components/ui/MicButton';
import SpeakerBadge from './SpeakerBadge';

interface RandomQuizGameProps {
  questions: ConversationPair[];
}

export default function RandomQuizGame({ questions }: RandomQuizGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [failCount, setFailCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [results, setResults] = useState<number[]>([]); // fail count per question
  const [finished, setFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { isListening, isSupported, startListening, stopListening } =
    useSpeechRecognition((transcript) => {
      setAnswer(transcript);
    });

  const handleMicClick = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  const pair = questions[currentIndex];

  const handleSubmit = useCallback(() => {
    if (answer.trim() === '') return;

    if (checkAnswer(answer, pair.answer.english)) {
      setIsCorrect(true);
      setResults((prev) => [...prev, failCount]);
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      setFailCount((prev) => prev + 1);
      setAnswer('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [answer, pair, failCount]);

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setAnswer('');
      setFailCount(0);
      setIsCorrect(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [currentIndex, questions.length]);

  if (finished) {
    const firstTryCount = results.filter((f) => f === 0).length;
    const totalAttempts = results.reduce((sum, f) => sum + f + 1, 0);

    return (
      <div className="text-center py-12 fade-in">
        <div className="text-5xl mb-4">
          {firstTryCount === questions.length ? '🎉' : firstTryCount >= questions.length / 2 ? '💪' : '📚'}
        </div>
        <p className="text-2xl font-bold text-primary mb-2">퀴즈 완료!</p>
        <p className="text-text-secondary font-medium mb-6">
          {questions.length}문제 중 {firstTryCount}문제 한 번에 정답
        </p>

        <div className="card-3d p-5 text-left max-w-sm mx-auto">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">총 문제 수</span>
              <span className="font-bold text-text">{questions.length}문제</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">한 번에 정답</span>
              <span className="font-bold text-success">{firstTryCount}문제</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">총 시도 횟수</span>
              <span className="font-bold text-text">{totalAttempts}회</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">정답률</span>
              <span className="font-bold text-primary">
                {Math.round((firstTryCount / questions.length) * 100)}%
              </span>
            </div>
          </div>
        </div>

        <Button
          className="mt-6"
          onClick={() => window.location.reload()}
        >
          다시 도전하기
        </Button>
      </div>
    );
  }

  const isKoreanRevealed = failCount >= BLUR_REVEAL_THRESHOLD;
  const progress = ((currentIndex + (isCorrect ? 1 : 0)) / questions.length) * 100;

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-text-secondary">
            {currentIndex + 1} / {questions.length}
          </span>
          <span className="text-sm font-bold text-primary">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-3 bg-surface-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Day label */}
      <div className="mb-4">
        <span className="inline-block px-2.5 py-1 bg-accent-orange/10 text-accent-orange text-xs font-bold rounded-full">
          Day {pair.dayId} — {pair.dayTitle}
        </span>
      </div>

      {/* Question (prompt line) */}
      <div className="card-3d p-4 mb-4">
        <div className="flex gap-3">
          <SpeakerBadge speaker={pair.question.speaker} />
          <div className="flex-1 min-w-0 pt-0.5">
            <p className="text-base leading-relaxed font-medium text-text">{pair.question.english}</p>
            <p className="text-sm text-text-secondary mt-1">{pair.question.korean}</p>
          </div>
        </div>
      </div>

      {/* Answer section */}
      <div className="card-3d p-4">
        <div className="flex gap-3">
          <SpeakerBadge speaker={pair.answer.speaker} />
          <div className="flex-1 min-w-0 pt-0.5">
            {/* Korean hint */}
            <p className={`text-sm text-text-secondary mb-2 ${
              isCorrect || isKoreanRevealed ? '' : 'blur-hint'
            }`}>
              {pair.answer.korean}
            </p>

            {isCorrect ? (
              <div className="fade-in">
                <p className="text-base font-medium text-success">{pair.answer.english}</p>
                <div className="mt-1 inline-block px-2 py-0.5 bg-success-light rounded-lg">
                  <span className="text-xs font-bold text-success-dark">
                    {failCount === 0 ? '한 번에 정답!' : `${failCount}회 시도 후 정답`}
                  </span>
                </div>
                <div className="mt-3">
                  <Button size="sm" onClick={handleNext}>
                    {currentIndex + 1 >= questions.length ? '결과 보기' : '다음 문제'}
                  </Button>
                </div>
              </div>
            ) : (
              <div className={isShaking ? 'shake' : ''}>
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <UnderlineInput
                      ref={inputRef}
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSubmit();
                      }}
                      status={isShaking ? 'incorrect' : 'default'}
                      placeholder="영어 문장을 입력하세요"
                      autoFocus
                    />
                  </div>
                  <MicButton
                    isListening={isListening}
                    isSupported={isSupported}
                    onClick={handleMicClick}
                  />
                  <Button
                    size="sm"
                    onClick={handleSubmit}
                    disabled={answer.trim() === ''}
                  >
                    확인
                  </Button>
                </div>
                {failCount > 0 && (
                  <p className="text-xs text-error mt-1.5 fade-in">
                    {failCount}회 오답 {failCount < BLUR_REVEAL_THRESHOLD && `(${BLUR_REVEAL_THRESHOLD - failCount}회 더 틀리면 힌트 공개)`}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
