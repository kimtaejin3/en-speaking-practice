export const TOTAL_DAYS = 100;
export const LINES_PER_CONVERSATION = 6;
export const LINES_PER_SPEAKER = 3;
export const BLUR_REVEAL_THRESHOLD = 3;

export const MODE_NAMES = {
  lineGuessing: '빈칸 맞추기',
  fullConversation: '전체 대화 입력',
  readAlong: '따라 읽기',
} as const;

export const MODE_DESCRIPTIONS = {
  lineGuessing: '상대방 대사를 보고 내 대사를 맞춰보세요',
  fullConversation: '대화 전체를 직접 입력해보세요',
  readAlong: '대화를 보며 따라 읽고 횟수를 기록하세요',
} as const;

export const MODE_PATHS = {
  lineGuessing: 'line-guessing',
  fullConversation: 'full-conversation',
  readAlong: 'read-along',
} as const;
