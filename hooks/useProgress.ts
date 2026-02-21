'use client';

import { useState, useEffect, useCallback } from 'react';
import { AppProgress } from '@/data/types';

export function useProgress() {
  const [progress, setProgress] = useState<AppProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/progress')
      .then((res) => res.json())
      .then((data: AppProgress) => {
        setProgress(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const sendUpdate = useCallback(async (body: Record<string, unknown>) => {
    const res = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const result = await res.json();
    if (result.success) {
      setProgress((prev) => (prev ? { ...prev, days: result.days } : prev));
    }
    return result;
  }, []);

  return { progress, loading, sendUpdate };
}

export function useDayProgress(dayId: number) {
  const { progress, loading, sendUpdate } = useProgress();
  const dayProgress = progress?.days[dayId] ?? null;

  const recordAttempt = useCallback(
    (
      mode: 'lineGuessing' | 'fullConversation',
      sentenceIndex: number,
      correct: boolean,
      role?: 'asA' | 'asB'
    ) =>
      sendUpdate({
        dayId,
        action: 'sentenceAttempt',
        mode,
        sentenceIndex,
        correct,
        ...(role && { role }),
      }),
    [dayId, sendUpdate]
  );

  const recordRead = useCallback(
    (sentenceIndex: number) =>
      sendUpdate({ dayId, action: 'readSentence', sentenceIndex }),
    [dayId, sendUpdate]
  );

  const completeFullConversation = useCallback(
    () => sendUpdate({ dayId, action: 'completeFullConversation' }),
    [dayId, sendUpdate]
  );

  return { dayProgress, loading, recordAttempt, recordRead, completeFullConversation };
}
