import { DayData } from '../types';
import day001 from './day001';
import day002 from './day002';
import day003 from './day003';
import day026 from './day026';
import day027 from './day027';
import day028 from './day028';
import day037 from './day037';
import day038 from './day038';
import day043 from './day043';
import day044 from './day044';


const days: Record<number, DayData> = {
  1: day001,
  2: day002,
  3: day003,
  26: day026,
  27: day027,
  28: day028,
  37: day037,
  38: day038,
  43: day043,
  44: day044,
};

export function getDayData(dayId: number): DayData | null {
  return days[dayId] ?? null;
}

export function getAvailableDayIds(): number[] {
  return Object.keys(days).map(Number).sort((a, b) => a - b);
}
