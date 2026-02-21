import { notFound } from 'next/navigation';
import { getDayData } from '@/data/days';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';

interface DayLayoutProps {
  children: React.ReactNode;
  params: Promise<{ dayId: string }>;
}

export default async function DayLayout({ children, params }: DayLayoutProps) {
  const { dayId: dayIdStr } = await params;
  const dayId = parseInt(dayIdStr, 10);

  if (isNaN(dayId) || dayId < 1 || dayId > 100) {
    notFound();
  }

  const dayData = getDayData(dayId);
  if (!dayData) {
    notFound();
  }

  return (
    <>
      <Header title={`Day ${dayId}: ${dayData.title}`} />
      <BottomNav />
      {children}
    </>
  );
}
