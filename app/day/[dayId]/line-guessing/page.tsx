'use client';

import { useState, use } from 'react';
import { notFound } from 'next/navigation';
import { getDayData } from '@/data/days';
import PageContainer from '@/components/layout/PageContainer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LineGuessingGame from '@/components/conversation/LineGuessingGame';

interface LineGuessingPageProps {
  params: Promise<{ dayId: string }>;
}

export default function LineGuessingPage({ params }: LineGuessingPageProps) {
  const { dayId: dayIdStr } = use(params);
  const dayId = parseInt(dayIdStr, 10);
  const dayData = getDayData(dayId);
  const [role, setRole] = useState<'A' | 'B' | null>(null);

  if (!dayData) notFound();

  if (!role) {
    return (
      <PageContainer>
        <h2 className="text-xl font-bold text-text mb-2">빈칸 맞추기</h2>
        <p className="text-text-secondary mb-6">어떤 역할로 연습할까요?</p>
        <div className="grid grid-cols-2 gap-4">
          <Card hoverable className="text-center !py-8" onClick={() => setRole('A')}>
            <div className="w-14 h-14 rounded-full bg-primary-light text-primary border-2 border-primary/30 flex items-center justify-center text-xl font-bold mx-auto mb-3">
              A
            </div>
            <p className="font-bold text-text">A 역할</p>
            <p className="text-sm text-text-secondary mt-1">A의 대사를 맞춰보세요</p>
          </Card>
          <Card hoverable className="text-center !py-8" onClick={() => setRole('B')}>
            <div className="w-14 h-14 rounded-full bg-accent-blue/10 text-accent-blue border-2 border-accent-blue/30 flex items-center justify-center text-xl font-bold mx-auto mb-3">
              B
            </div>
            <p className="font-bold text-text">B 역할</p>
            <p className="text-sm text-text-secondary mt-1">B의 대사를 맞춰보세요</p>
          </Card>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-text">빈칸 맞추기</h2>
        <Button variant="ghost" size="sm" onClick={() => setRole(null)}>
          역할 변경
        </Button>
      </div>
      <p className="text-sm text-text-secondary mb-4">
        <span className={`font-bold ${role === 'A' ? 'text-primary' : 'text-accent-blue'}`}>{role}</span> 역할의 대사를 입력하세요
      </p>
      <Card>
        <LineGuessingGame key={role} dayData={dayData} role={role} />
      </Card>
    </PageContainer>
  );
}
