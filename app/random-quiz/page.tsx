'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import PageContainer from '@/components/layout/PageContainer';
import Card from '@/components/ui/Card';
import RandomQuizGame from '@/components/conversation/RandomQuizGame';
import { getAllConversationPairs } from '@/data/days/index';
import { shuffleArray } from '@/lib/utils';

const COUNT_OPTIONS = [5, 10, 15, 20] as const;

export default function RandomQuizPage() {
  const [selectedCount, setSelectedCount] = useState<number | null>(null);

  const allPairs = useMemo(() => getAllConversationPairs(), []);

  const questions = useMemo(() => {
    if (selectedCount === null) return [];
    const count = Math.min(selectedCount, allPairs.length);
    return shuffleArray(allPairs).slice(0, count);
  }, [selectedCount, allPairs]);

  return (
    <>
      <Header />
      <BottomNav />
      <PageContainer>
        {selectedCount === null ? (
          <div>
            <div className="text-center mb-8 pt-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-orange/10 mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-orange">
                  <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-text mb-1">랜덤 퀴즈</h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                모든 Day에서 랜덤으로 출제되는 문제를 풀어보세요
              </p>
              <div className="mt-3 inline-block px-3 py-1.5 bg-accent-orange/10 rounded-full">
                <span className="text-xs font-bold text-accent-orange">
                  총 {allPairs.length}개 문제 중 선택
                </span>
              </div>
            </div>

            <h3 className="font-bold text-text mb-3">문제 수를 선택하세요</h3>
            <div className="grid grid-cols-2 gap-3">
              {COUNT_OPTIONS.map((count) => (
                <button
                  key={count}
                  onClick={() => setSelectedCount(count)}
                  disabled={count > allPairs.length}
                >
                  <Card hoverable className="text-center py-6">
                    <div className="text-3xl font-bold text-primary mb-1">{count}</div>
                    <p className="text-sm text-text-secondary">문제</p>
                  </Card>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <RandomQuizGame questions={questions} />
        )}
      </PageContainer>
    </>
  );
}
