'use client';

import { useMemo } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { getOverallStats } from '@/lib/progress';
import { getAvailableDayIds, getDayData } from '@/data/days';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import PageContainer from '@/components/layout/PageContainer';
import OverallProgress from '@/components/progress/OverallProgress';
import DayProgressCard from '@/components/progress/DayProgressCard';

export default function ProgressPage() {
  const { progress, loading } = useProgress();

  const stats = useMemo(
    () => progress ? getOverallStats(progress) : null,
    [progress]
  );

  const availableDays = useMemo(() => {
    const ids = getAvailableDayIds();
    return ids.map((id) => ({ data: getDayData(id)!, id }));
  }, []);

  if (loading) {
    return (
      <>
        <Header title="학습 현황" />
        <BottomNav />
        <PageContainer>
          <div className="text-center py-10 text-text-secondary">로딩 중...</div>
        </PageContainer>
      </>
    );
  }

  return (
    <>
      <Header title="학습 현황" />
      <BottomNav />
      <PageContainer>
        {stats && <OverallProgress stats={stats} />}

        <h3 className="font-semibold mb-3">Day별 진행 상황</h3>
        <div className="space-y-3">
          {availableDays.map(({ data, id }) => (
            <DayProgressCard
              key={id}
              dayData={data}
              dayProgress={progress?.days[id]}
            />
          ))}
        </div>
      </PageContainer>
    </>
  );
}
