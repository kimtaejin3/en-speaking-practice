import { DayData } from '../types';

const day003: DayData = {
  id: 3,
  title: '시간 가는 줄 몰랐어',
  conversation: [
    { speaker: 'A', english: "Wow, it's already 10 PM!", korean: '와, 벌써 밤 10시야!' },
    { speaker: 'B', english: 'Time flies when you are having fun.', korean: '즐거우면 시간이 빨리 가지.' },
    { speaker: 'A', english: "That's true. I didn't realize it was this late.", korean: '맞아. 이렇게 늦은 줄 몰랐어.' },
    { speaker: 'B', english: 'We should probably head home soon.', korean: '슬슬 집에 가야 할 것 같아.' },
    { speaker: 'A', english: "Yeah, let's call it a night.", korean: '응, 오늘은 여기까지 하자.' },
    { speaker: 'B', english: "This was really fun. Let's do this again soon.", korean: '정말 재밌었어. 조만간 또 하자.' },
  ],
  representativeExpression: {
    english: 'Time flies when you are having fun.',
    korean: '즐거우면 시간이 빨리 가지.',
    explanation: '즐거운 시간을 보내다 보면 시간이 빠르게 지나간다는 의미의 표현입니다. "Time flies"는 "시간이 날아가다"라는 뜻으로, 시간이 매우 빠르게 흐른다는 것을 비유적으로 나타냅니다.',
  },
};

export default day003;
