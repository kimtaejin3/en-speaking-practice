export interface ConversationLine {
  speaker: 'A' | 'B';
  english: string;
  korean: string;
}

export interface DayData {
  id: number;
  title: string;
  conversation: ConversationLine[];
  representativeExpression: {
    english: string;
    korean: string;
    explanation: string;
  };
}

export interface SentenceGuessProgress {
  correctCount: number;
  incorrectCount: number;
  lastAttemptedAt: string | null;
}

export interface SentenceReadProgress {
  readCount: number;
  lastReadAt: string | null;
}

export interface DayProgress {
  dayId: number;
  lineGuessing: {
    asA: SentenceGuessProgress[];
    asB: SentenceGuessProgress[];
  };
  fullConversation: {
    sentences: SentenceGuessProgress[];
    completionCount: number;
    lastCompletedAt: string | null;
  };
  readAlong: {
    sentences: SentenceReadProgress[];
    lastReadAt: string | null;
  };
}

export interface AppProgress {
  version: number;
  days: Record<number, DayProgress>;
}
