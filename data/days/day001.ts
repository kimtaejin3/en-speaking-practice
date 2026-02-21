import { DayData } from '../types';

const day001: DayData = {
  id: 1,
  title: '긍정적으로 생각해',
  conversation: [
    { speaker: 'A', english: "I can't believe I failed the test again.", korean: '시험에 또 떨어졌다니 믿을 수가 없어.' },
    { speaker: 'B', english: 'Look on the bright side. At least you know what to study now.', korean: '긍정적으로 생각해. 최소한 이제 뭘 공부해야 하는지 알잖아.' },
    { speaker: 'A', english: "I guess you're right. But it's still frustrating.", korean: '네 말이 맞는 것 같아. 그래도 여전히 속상해.' },
    { speaker: 'B', english: "I understand. But don't give up.", korean: '이해해. 하지만 포기하지 마.' },
    { speaker: 'A', english: "Thanks. I'll try harder next time.", korean: '고마워. 다음에는 더 열심히 할게.' },
    { speaker: 'B', english: "That's the spirit! You can do it.", korean: '그래, 그 정신이야! 넌 할 수 있어.' },
  ],
  representativeExpression: {
    english: 'Look on the bright side.',
    korean: '긍정적으로 생각해.',
    explanation: '안 좋은 상황에서도 좋은 면을 보라고 격려할 때 사용하는 표현입니다. bright side는 "밝은 면"이라는 뜻으로, 어두운 상황 속에서도 희망적인 부분을 찾아보자는 의미입니다.',
  },
};

export default day001;
