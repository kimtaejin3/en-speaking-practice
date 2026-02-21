import fs from 'fs';
import path from 'path';
import { AppProgress, DayProgress, SentenceGuessProgress, SentenceReadProgress } from '@/data/types';
import { LINES_PER_SPEAKER, LINES_PER_CONVERSATION } from '@/data/constants';

const PROGRESS_FILE = path.join(process.cwd(), 'data', 'progress.json');

const INITIAL_PROGRESS: AppProgress = {
  version: 2,
  days: {},
};

function createEmptySentenceGuess(): SentenceGuessProgress {
  return { correctCount: 0, incorrectCount: 0, lastAttemptedAt: null };
}

function createEmptySentenceRead(): SentenceReadProgress {
  return { readCount: 0, lastReadAt: null };
}

export function createEmptyDayProgress(dayId: number): DayProgress {
  return {
    dayId,
    lineGuessing: {
      asA: Array.from({ length: LINES_PER_SPEAKER }, createEmptySentenceGuess),
      asB: Array.from({ length: LINES_PER_SPEAKER }, createEmptySentenceGuess),
    },
    fullConversation: {
      sentences: Array.from({ length: LINES_PER_CONVERSATION }, createEmptySentenceGuess),
      completionCount: 0,
      lastCompletedAt: null,
    },
    readAlong: {
      sentences: Array.from({ length: LINES_PER_CONVERSATION }, createEmptySentenceRead),
      lastReadAt: null,
    },
  };
}

/** Migrate v1 data to v2 format */
function migrateDayProgress(dp: Record<string, unknown>, dayId: number): DayProgress {
  const base = createEmptyDayProgress(dayId);

  // Preserve lineGuessing if it exists
  const lg = dp.lineGuessing as Record<string, unknown> | undefined;
  if (lg) {
    if (Array.isArray(lg.asA)) base.lineGuessing.asA = lg.asA;
    if (Array.isArray(lg.asB)) base.lineGuessing.asB = lg.asB;
  }

  // Migrate fullConversation
  const fc = dp.fullConversation as Record<string, unknown> | undefined;
  if (fc) {
    if (Array.isArray(fc.sentences)) base.fullConversation.sentences = fc.sentences;
    if (typeof fc.completionCount === 'number') base.fullConversation.completionCount = fc.completionCount;
    if (fc.lastCompletedAt) base.fullConversation.lastCompletedAt = fc.lastCompletedAt as string;
  }

  // Migrate readAlong
  const ra = dp.readAlong as Record<string, unknown> | undefined;
  if (ra) {
    if (Array.isArray(ra.sentences)) base.readAlong.sentences = ra.sentences;
    if (ra.lastReadAt) base.readAlong.lastReadAt = ra.lastReadAt as string;
  }

  return base;
}

export function readProgress(): AppProgress {
  try {
    const data = fs.readFileSync(PROGRESS_FILE, 'utf-8');
    const parsed = JSON.parse(data) as AppProgress;

    // Migrate if needed
    if (parsed.version !== 2) {
      const migrated: AppProgress = { version: 2, days: {} };
      for (const [key, dp] of Object.entries(parsed.days)) {
        const dayId = Number(key);
        migrated.days[dayId] = migrateDayProgress(dp as unknown as Record<string, unknown>, dayId);
      }
      writeProgress(migrated);
      return migrated;
    }

    return parsed;
  } catch {
    writeProgress(INITIAL_PROGRESS);
    return { ...INITIAL_PROGRESS, days: {} };
  }
}

export function writeProgress(progress: AppProgress): void {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}
