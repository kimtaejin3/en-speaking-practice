import { DayData } from '../types';

const day003: DayData = {
  id: 3,
  title: `what's the weather like?`,
  conversation: [
    { speaker: 'A', english: `what's the weather going to be like this Saturday?`, korean: `이번 주 토요일 날씨가 어떨 것 같아?` },
    { speaker: 'B', english: `The weather reporter said it is gonna be raining.`, korean: `일기예보에서 비가 올 거라고 했어.` },
    { speaker: 'A', english: `I get the feeling that we should call off our trip.`, korean: `여행을 취소해야 할 것 같은 느낌이 들어.` },
    { speaker: 'B', english: `Boy! It totally slipped my mind.`, korean: `이런! 깜빡 잊고 있었네.` },
    { speaker: 'A', english: `Don't tell me you were going to go alone behind my back.`, korean: `설마 나 몰래 혼자 가려고 했던 건 아니겠지.` },
    { speaker: 'B', english: `No way. I'll just go with the flow`, korean: `말도 안 돼. 난 그냥 대세를 따를 거야.` },
  
  ],
  representativeExpression: {
    english: `what's the weather like?.`,
    korean: '날씨가 어때?',
    explanation: `What + be 동산 ~ like? 는 사물이나 사람의 상태를 물을 때 사용하는 표현입니다. '새로 오신 선생님 어때?' 라고 묻는다면 what's your new teacher like? 와 같이 말하면 되겠죠.`,
  },
};

export default day003;
