'use client';

import { useState, useEffect, useCallback } from 'react';
import { AppProgress, DayProgress, SentenceGuessProgress, SentenceReadProgress } from '@/data/types';
import { LINES_PER_SPEAKER, LINES_PER_CONVERSATION } from '@/data/constants';

const STORAGE_KEY = 'en-speaking-progress';

const INITIAL_PROGRESS: AppProgress = { version: 2, days: {} };

function createEmptySentenceGuess(): SentenceGuessProgress {
  return { correctCount: 0, incorrectCount: 0, lastAttemptedAt: null };
}

function createEmptySentenceRead(): SentenceReadProgress {
  return { readCount: 0, lastReadAt: null };
}

function createEmptyDayProgress(dayId: number): DayProgress {
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

function loadProgress(): AppProgress {
  if (typeof window === 'undefined') return INITIAL_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROGRESS;
    const parsed = JSON.parse(raw) as AppProgress;

    // Migrate v1 → v2
    if (parsed.version !== 2) {
      const migrated: AppProgress = { version: 2, days: {} };
      for (const [key, dp] of Object.entries(parsed.days)) {
        const dayId = Number(key);
        const base = createEmptyDayProgress(dayId);
        const old = dp as unknown as Record<string, unknown>;
        const lg = old.lineGuessing as Record<string, unknown> | undefined;
        if (lg) {
          if (Array.isArray(lg.asA)) base.lineGuessing.asA = lg.asA;
          if (Array.isArray(lg.asB)) base.lineGuessing.asB = lg.asB;
        }
        migrated.days[dayId] = base;
      }
      saveProgress(migrated);
      return migrated;
    }

    return parsed;
  } catch {
    return INITIAL_PROGRESS;
  }
}

function saveProgress(progress: AppProgress): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function ensureDay(progress: AppProgress, dayId: number): AppProgress {
  if (progress.days[dayId]) return progress;
  return {
    ...progress,
    days: { ...progress.days, [dayId]: createEmptyDayProgress(dayId) },
  };
}

export function useProgress() {
  const [progress, setProgress] = useState<AppProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProgress(loadProgress());
    setLoading(false);
  }, []);

  const applyUpdate = useCallback(
    (updater: (p: AppProgress) => AppProgress) => {
      setProgress((prev) => {
        const current = prev ?? INITIAL_PROGRESS;
        const next = updater(current);
        saveProgress(next);
        return next;
      });
    },
    []
  );

  return { progress, loading, applyUpdate };
}

export function useDayProgress(dayId: number) {
  const { progress, loading, applyUpdate } = useProgress();
  const dayProgress = progress?.days[dayId] ?? null;

  const recordAttempt = useCallback(
    (
      mode: 'lineGuessing' | 'fullConversation',
      sentenceIndex: number,
      correct: boolean,
      role?: 'asA' | 'asB'
    ) => {
      applyUpdate((p) => {
        const next = ensureDay(structuredClone(p), dayId);
        const day = next.days[dayId];
        const now = new Date().toISOString();

        if (mode === 'lineGuessing' && role) {
          const s = day.lineGuessing[role][sentenceIndex];
          if (s) {
            if (correct) s.correctCount++;
            else s.incorrectCount++;
            s.lastAttemptedAt = now;
          }
        } else if (mode === 'fullConversation') {
          const s = day.fullConversation.sentences[sentenceIndex];
          if (s) {
            if (correct) s.correctCount++;
            else s.incorrectCount++;
            s.lastAttemptedAt = now;
          }
        }

        return next;
      });
    },
    [dayId, applyUpdate]
  );

  const recordRead = useCallback(
    (sentenceIndex: number) => {
      applyUpdate((p) => {
        const next = ensureDay(structuredClone(p), dayId);
        const day = next.days[dayId];
        const now = new Date().toISOString();
        const s = day.readAlong.sentences[sentenceIndex];
        if (s) {
          s.readCount++;
          s.lastReadAt = now;
        }
        day.readAlong.lastReadAt = now;
        return next;
      });
    },
    [dayId, applyUpdate]
  );

  const completeFullConversation = useCallback(
    () => {
      applyUpdate((p) => {
        const next = ensureDay(structuredClone(p), dayId);
        const day = next.days[dayId];
        day.fullConversation.completionCount++;
        day.fullConversation.lastCompletedAt = new Date().toISOString();
        return next;
      });
    },
    [dayId, applyUpdate]
  );

  return { dayProgress, loading, recordAttempt, recordRead, completeFullConversation };
}
