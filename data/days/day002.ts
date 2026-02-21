import { DayData } from '../types';

const day002: DayData = {
  id: 2,
  title: '그건 말도 안 돼',
  conversation: [
    { speaker: 'A', english: 'Did you hear? They canceled the company trip.', korean: '들었어? 회사 여행이 취소됐대.' },
    { speaker: 'B', english: "That doesn't make any sense. Everyone was looking forward to it.", korean: '그건 말도 안 돼. 다들 기대하고 있었는데.' },
    { speaker: 'A', english: 'I know. They said it was because of the budget.', korean: '그러게. 예산 때문이래.' },
    { speaker: 'B', english: "That's so disappointing. We worked so hard this year.", korean: '정말 실망이다. 올해 정말 열심히 일했는데.' },
    { speaker: 'A', english: 'Maybe we should talk to the manager about it.', korean: '매니저한테 얘기해 봐야 할 것 같아.' },
    { speaker: 'B', english: "Good idea. Let's do that together.", korean: '좋은 생각이야. 같이 하자.' },
  ],
  representativeExpression: {
    english: "That doesn't make any sense.",
    korean: '그건 말도 안 돼.',
    explanation: '상대방의 말이나 어떤 상황이 논리적이지 않거나 이해할 수 없을 때 사용하는 표현입니다. make sense는 "이치에 맞다, 말이 되다"라는 뜻입니다.',
  },
};

export default day002;
