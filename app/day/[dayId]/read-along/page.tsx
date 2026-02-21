'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { getDayData } from '@/data/days';
import PageContainer from '@/components/layout/PageContainer';
import Card from '@/components/ui/Card';
import ReadAlongCounter from '@/components/conversation/ReadAlongCounter';

interface ReadAlongPageProps {
  params: Promise<{ dayId: string }>;
}

export default function ReadAlongPage({ params }: ReadAlongPageProps) {
  const { dayId: dayIdStr } = use(params);
  const dayId = parseInt(dayIdStr, 10);
  const dayData = getDayData(dayId);

  if (!dayData) notFound();

  return (
    <PageContainer>
      <h2 className="text-xl font-bold mb-2">따라 읽기</h2>
      <p className="text-sm text-text-secondary mb-4">
        대화를 보며 따라 읽고 완료 버튼을 눌러주세요
      </p>
      <Card>
        <ReadAlongCounter dayData={dayData} />
      </Card>
    </PageContainer>
  );
}
