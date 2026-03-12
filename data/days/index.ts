import { ConversationLine, DayData } from "../types";
import day001 from "./day001";
import day002 from "./day002";
import day003 from "./day003";
import day026 from "./day026";
import day027 from "./day027";
import day028 from "./day028";
import day037 from "./day037";
import day038 from "./day038";
import day043 from "./day043";
import day044 from "./day044";
import day045 from "./day045";
import day046 from "./day046";
import day047 from "./day047";
import day053 from "./day053";

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
  45: day045,
  46: day046,
  47: day047,
  53: day053,
};

export function getDayData(dayId: number): DayData | null {
  return days[dayId] ?? null;
}

export function getAvailableDayIds(): number[] {
  return Object.keys(days)
    .map(Number)
    .sort((a, b) => a - b);
}

export interface ConversationPair {
  dayId: number;
  dayTitle: string;
  question: ConversationLine;
  answer: ConversationLine;
}

export function getAllConversationPairs(): ConversationPair[] {
  const pairs: ConversationPair[] = [];
  for (const day of Object.values(days)) {
    const conv = day.conversation;
    for (let i = 0; i < conv.length - 1; i++) {
      pairs.push({
        dayId: day.id,
        dayTitle: day.title,
        question: conv[i],
        answer: conv[i + 1],
      });
    }
  }
  return pairs;
}
