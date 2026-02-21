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
        const level = !loading && progress ? getDayCompletionLevel(progress.days[dayId]) : 'none';
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

        const levelStyles = {
          none: 'bg-surface border-2 border-border text-text font-bold hover:border-primary hover:shadow-md',
          partial: 'bg-primary-light border-2 border-primary/40 text-primary-dark font-bold hover:shadow-md',
          complete: 'bg-primary border-2 border-primary-dark text-white font-bold shadow-[0_2px_0_var(--color-primary-shadow)] hover:brightness-110',
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
