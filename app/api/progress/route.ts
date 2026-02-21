import { NextResponse } from 'next/server';
import { getProgress, setProgress } from '@/lib/redis';
import { AppProgress, DayProgress, SentenceGuessProgress, SentenceReadProgress } from '@/data/types';
import { LINES_PER_SPEAKER, LINES_PER_CONVERSATION } from '@/data/constants';

function createEmptyDayProgress(dayId: number): DayProgress {
  const emptyGuess = (): SentenceGuessProgress => ({ correctCount: 0, incorrectCount: 0, lastAttemptedAt: null });
  const emptyRead = (): SentenceReadProgress => ({ readCount: 0, lastReadAt: null });
  return {
    dayId,
    lineGuessing: {
      asA: Array.from({ length: LINES_PER_SPEAKER }, emptyGuess),
      asB: Array.from({ length: LINES_PER_SPEAKER }, emptyGuess),
    },
    fullConversation: {
      sentences: Array.from({ length: LINES_PER_CONVERSATION }, emptyGuess),
      completionCount: 0,
      lastCompletedAt: null,
    },
    readAlong: {
      sentences: Array.from({ length: LINES_PER_CONVERSATION }, emptyRead),
      lastReadAt: null,
    },
  };
}

function ensureDay(progress: AppProgress, dayId: number): void {
  if (!progress.days[dayId]) {
    progress.days[dayId] = createEmptyDayProgress(dayId);
  }
}

export async function GET() {
  const progress = await getProgress();
  return NextResponse.json(progress);
}

type UpdatePayload =
  | { dayId: number; action: 'sentenceAttempt'; mode: 'lineGuessing'; role: 'asA' | 'asB'; sentenceIndex: number; correct: boolean }
  | { dayId: number; action: 'sentenceAttempt'; mode: 'fullConversation'; sentenceIndex: number; correct: boolean }
  | { dayId: number; action: 'readSentence'; sentenceIndex: number }
  | { dayId: number; action: 'readAllSentences' }
  | { dayId: number; action: 'completeFullConversation' };

export async function POST(request: Request) {
  const body = (await request.json()) as UpdatePayload;
  const { dayId, action } = body;

  const progress = await getProgress();
  ensureDay(progress, dayId);

  const day = progress.days[dayId];
  const now = new Date().toISOString();

  if (action === 'sentenceAttempt') {
    const { mode, sentenceIndex, correct } = body;
    if (mode === 'lineGuessing' && 'role' in body) {
      const s = day.lineGuessing[body.role][sentenceIndex];
      if (s) {
        if (correct) s.correctCount++; else s.incorrectCount++;
        s.lastAttemptedAt = now;
      }
    } else if (mode === 'fullConversation') {
      const s = day.fullConversation.sentences[sentenceIndex];
      if (s) {
        if (correct) s.correctCount++; else s.incorrectCount++;
        s.lastAttemptedAt = now;
      }
    }
  } else if (action === 'readSentence') {
    const s = day.readAlong.sentences[body.sentenceIndex];
    if (s) { s.readCount++; s.lastReadAt = now; }
    day.readAlong.lastReadAt = now;
  } else if (action === 'readAllSentences') {
    for (const s of day.readAlong.sentences) {
      s.readCount++;
      s.lastReadAt = now;
    }
    day.readAlong.lastReadAt = now;
  } else if (action === 'completeFullConversation') {
    day.fullConversation.completionCount++;
    day.fullConversation.lastCompletedAt = now;
  }

  await setProgress(progress);
  return NextResponse.json({ success: true, days: progress.days });
}
