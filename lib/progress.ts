import { AppProgress, ConversationLine, DayProgress } from '@/data/types';
import { getAvailableDayIds } from '@/data/days';

export interface SentenceAggregateStats {
  english: string;
  korean: string;
  speaker: 'A' | 'B';
  correctCount: number;
  incorrectCount: number;
  readCount: number;
}

/**
 * 대화의 각 문장별로 모든 모드(빈칸 맞추기 + 전체 대화 + 따라 읽기)의
 * 통계를 합산해서 반환합니다.
 */
export function getSentenceAggregateStats(
  dayProgress: DayProgress | undefined,
  conversation: ConversationLine[]
): SentenceAggregateStats[] {
  return conversation.map((line, index) => {
    if (!dayProgress) {
      return { english: line.english, korean: line.korean, speaker: line.speaker, correctCount: 0, incorrectCount: 0, readCount: 0 };
    }

    // lineGuessing: speaker-specific index (A→asA[0,1,2], B→asB[0,1,2])
    const speakerRole = line.speaker === 'A' ? 'asA' as const : 'asB' as const;
    let speakerIndex = 0;
    for (let j = 0; j < index; j++) {
      if (conversation[j].speaker === line.speaker) speakerIndex++;
    }

    const lg = dayProgress.lineGuessing[speakerRole][speakerIndex];
    const fc = dayProgress.fullConversation.sentences[index];
    const ra = dayProgress.readAlong.sentences[index];

    return {
      english: line.english,
      korean: line.korean,
      speaker: line.speaker,
      correctCount: (lg?.correctCount ?? 0) + (fc?.correctCount ?? 0),
      incorrectCount: (lg?.incorrectCount ?? 0) + (fc?.incorrectCount ?? 0),
      readCount: ra?.readCount ?? 0,
    };
  });
}

export function getDayCompletionLevel(dayProgress: DayProgress | undefined): number {
  if (!dayProgress) return 0;

  let totalCount = 0;

  for (const role of ['asA', 'asB'] as const) {
    for (const s of dayProgress.lineGuessing[role]) {
      totalCount += s.correctCount + s.incorrectCount;
    }
  }
  for (const s of dayProgress.fullConversation.sentences) {
    totalCount += s.correctCount + s.incorrectCount;
  }
  for (const s of dayProgress.readAlong.sentences) {
    totalCount += s.readCount;
  }

  if (totalCount === 0) return 0;
  if (totalCount <= 3) return 1;
  if (totalCount <= 6) return 2;
  if (totalCount <= 12) return 3;
  if (totalCount <= 20) return 4;
  if (totalCount <= 30) return 5;
  if (totalCount <= 45) return 6;
  if (totalCount <= 65) return 7;
  if (totalCount <= 90) return 8;
  if (totalCount <= 120) return 9;
  return 10;
}

export function getOverallStats(progress: AppProgress) {
  const availableDays = getAvailableDayIds();
  let completedDays = 0;
  let partialDays = 0;
  let totalReadCount = 0;
  let totalCorrect = 0;
  let totalIncorrect = 0;

  for (const dayId of availableDays) {
    const dp = progress.days[dayId];
    const level = getDayCompletionLevel(dp);
    if (level === 10) completedDays++;
    else if (level > 0) partialDays++;

    if (dp) {
      // Read count from per-sentence tracking
      for (const s of dp.readAlong.sentences) {
        totalReadCount += s.readCount;
      }
      // Line guessing stats
      for (const role of ['asA', 'asB'] as const) {
        for (const s of dp.lineGuessing[role]) {
          totalCorrect += s.correctCount;
          totalIncorrect += s.incorrectCount;
        }
      }
      // Full conversation stats
      for (const s of dp.fullConversation.sentences) {
        totalCorrect += s.correctCount;
        totalIncorrect += s.incorrectCount;
      }
    }
  }

  return {
    availableDays: availableDays.length,
    completedDays,
    partialDays,
    totalReadCount,
    totalCorrect,
    totalIncorrect,
    accuracy: totalCorrect + totalIncorrect > 0
      ? Math.round((totalCorrect / (totalCorrect + totalIncorrect)) * 100)
      : 0,
  };
}
