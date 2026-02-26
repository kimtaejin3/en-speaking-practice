'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useProgress } from '@/hooks/useProgress';
import { getDayCompletionLevel } from '@/lib/progress';
import { getAvailableDayIds } from '@/data/days';
import { TOTAL_DAYS } from '@/data/constants';

export default function DaySelector() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const { progress, loading } = useProgress();
  const availableIds = new Set(getAvailableDayIds());

  return (
    <div className="grid grid-cols-5 gap-2.5 sm:grid-cols-10">
      {Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).map((dayId) => {
        const isAvailable = availableIds.has(dayId);
        const level = !loading && progress ? getDayCompletionLevel(progress.days[dayId]) : 0;
        const href = mode ? `/day/${dayId}/${mode}` : `/day/${dayId}`;

        if (!isAvailable) {
          return (
            <div
              key={dayId}
              className="aspect-square flex items-center justify-center rounded-xl border-2 border-border bg-surface text-text-disabled text-sm font-bold"
            >
              {dayId}
            </div>
          );
        }

        const levelStyles: Record<number, string> = {
          0: 'bg-surface border-2 border-border text-text font-bold hover:border-primary hover:shadow-md',
          1: 'bg-[#f0fbe0] border-2 border-[#d4edb4] text-[#3d7a0a] font-bold hover:shadow-md',
          2: 'bg-[#e2f7c2] border-2 border-[#c4e498] text-[#357209] font-bold hover:shadow-md',
          3: 'bg-[#d0f0a0] border-2 border-[#afd87a] text-[#2d6a08] font-bold hover:shadow-md',
          4: 'bg-[#b8e676] border-2 border-[#96cc52] text-[#256207] font-bold hover:shadow-md',
          5: 'bg-[#9cdb4c] border-2 border-[#7ec230] text-[#1d5a06] font-bold hover:shadow-md',
          6: 'bg-[#7ecc2a] border-2 border-[#64b018] text-white font-bold hover:shadow-md',
          7: 'bg-[#62b510] border-2 border-[#4e9a0a] text-white font-bold hover:shadow-md',
          8: 'bg-[#4e9a0a] border-2 border-[#3d7a08] text-white font-bold hover:shadow-md',
          9: 'bg-[#3d7a08] border-2 border-[#2d5e06] text-white font-bold hover:shadow-md',
          10: 'bg-[#2d5e06] border-2 border-[#1e4004] text-white font-bold shadow-[0_2px_0_#1e4004] hover:brightness-110',
        };

        return (
          <Link
            key={dayId}
            href={href}
            className={`aspect-square flex items-center justify-center rounded-xl text-sm transition-all active:translate-y-0.5 active:shadow-none ${levelStyles[level]}`}
          >
            {dayId}
          </Link>
        );
      })}
    </div>
  );
}
