import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const PROGRESS_KEY = 'app-progress';

import { AppProgress } from '@/data/types';

const INITIAL_PROGRESS: AppProgress = { version: 2, days: {} };

export async function getProgress(): Promise<AppProgress> {
  const data = await redis.get<AppProgress>(PROGRESS_KEY);
  return data ?? INITIAL_PROGRESS;
}

export async function setProgress(progress: AppProgress): Promise<void> {
  await redis.set(PROGRESS_KEY, progress);
}
