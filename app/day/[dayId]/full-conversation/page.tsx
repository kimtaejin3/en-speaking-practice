'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { getDayData } from '@/data/days';
import PageContainer from '@/components/layout/PageContainer';
import Card from '@/components/ui/Card';
import FullConversationPractice from '@/components/conversation/FullConversationPractice';

interface FullConversationPageProps {
  params: Promise<{ dayId: string }>;
}

export default function FullConversationPage({ params }: FullConversationPageProps) {
  const { dayId: dayIdStr } = use(params);
  const dayId = parseInt(dayIdStr, 10);
  const dayData = getDayData(dayId);

  if (!dayData) notFound();

  return (
    <PageContainer>
      <h2 className="text-xl font-bold mb-2">전체 대화 입력</h2>
      <p className="text-sm text-text-secondary mb-4">
        한글 해석을 보고 영어 대화를 입력하세요
      </p>
      <Card>
        <FullConversationPractice dayData={dayData} />
      </Card>
    </PageContainer>
  );
}
