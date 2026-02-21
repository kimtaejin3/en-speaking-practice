import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import PageContainer from '@/components/layout/PageContainer';
import DaySelector from '@/components/day/DaySelector';

export default function DaysPage() {
  return (
    <>
      <Header title="Day 선택" />
      <BottomNav />
      <PageContainer>
        <p className="text-text-secondary text-sm mb-4">학습할 Day를 선택하세요. 색상이 있는 Day는 학습 기록이 있습니다.</p>
        <Suspense fallback={<div className="text-center py-10 text-text-secondary">로딩 중...</div>}>
          <DaySelector />
        </Suspense>
      </PageContainer>
    </>
  );
}
