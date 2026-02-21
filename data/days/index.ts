import { DayData } from '../types';
import day001 from './day001';
import day002 from './day002';
import day003 from './day003';
import day037 from './day037';

const days: Record<number, DayData> = {
  1: day001,
  2: day002,
  3: day003,
  37: day037,
};

export function getDayData(dayId: number): DayData | null {
  return days[dayId] ?? null;
}

export function getAvailableDayIds(): number[] {
  return Object.keys(days).map(Number).sort((a, b) => a - b);
}
