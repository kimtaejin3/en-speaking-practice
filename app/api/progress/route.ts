import { NextResponse } from 'next/server';
import { readProgress, writeProgress, createEmptyDayProgress } from '@/lib/progress-file';

export async function GET() {
  const progress = readProgress();
  return NextResponse.json(progress);
}

type UpdatePayload =
  | {
      dayId: number;
      action: 'sentenceAttempt';
      mode: 'lineGuessing';
      role: 'asA' | 'asB';
      sentenceIndex: number;
      correct: boolean;
    }
  | {
      dayId: number;
      action: 'sentenceAttempt';
      mode: 'fullConversation';
      sentenceIndex: number;
      correct: boolean;
    }
  | {
      dayId: number;
      action: 'readSentence';
      sentenceIndex: number;
    }
  | {
      dayId: number;
      action: 'completeFullConversation';
    };

export async function POST(request: Request) {
  const body = (await request.json()) as UpdatePayload;
  const { dayId, action } = body;

  const progress = readProgress();

  if (!progress.days[dayId]) {
    progress.days[dayId] = createEmptyDayProgress(dayId);
  }

  const day = progress.days[dayId];
  const now = new Date().toISOString();

  if (action === 'sentenceAttempt') {
    const { mode, sentenceIndex, correct } = body;

    if (mode === 'lineGuessing' && 'role' in body) {
      const arr = day.lineGuessing[body.role];
      if (arr[sentenceIndex]) {
        if (correct) arr[sentenceIndex].correctCount++;
        else arr[sentenceIndex].incorrectCount++;
        arr[sentenceIndex].lastAttemptedAt = now;
      }
    } else if (mode === 'fullConversation') {
      const s = day.fullConversation.sentences[sentenceIndex];
      if (s) {
        if (correct) s.correctCount++;
        else s.incorrectCount++;
        s.lastAttemptedAt = now;
      }
    }
  } else if (action === 'readSentence') {
    const { sentenceIndex } = body;
    const s = day.readAlong.sentences[sentenceIndex];
    if (s) {
      s.readCount++;
      s.lastReadAt = now;
    }
    day.readAlong.lastReadAt = now;
  } else if (action === 'completeFullConversation') {
    day.fullConversation.completionCount++;
    day.fullConversation.lastCompletedAt = now;
  }

  writeProgress(progress);
  return NextResponse.json({ success: true, days: progress.days });
}
