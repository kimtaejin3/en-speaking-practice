import { DayData } from '../types';

const day002: DayData = {
  id: 2,
  title: 'Don\'t mention it.',
  conversation: [
    { speaker: 'A', english: `I got something for your birthday.`, korean: `네 생일 선물로 뭘 좀 샀어.` },
    { speaker: 'B', english: `A present for me? you shouldn't have`, korean: `내 선물이라고? 이러지 않아도 되는데!`},
    { speaker: 'A', english: `It's cold outside. I'll give you a ride home.`, korean: `바깥 날씨가 추워. 집까지 태워 줄게.`},
    { speaker: 'B', english: `Don't bother. but thanks anyway.`, korean: `일부러 그럴 거 없어. 어쩃든 고마워.` },
    { speaker: 'A', english: `Don't mention it. that's what friends are for.`, korean: `별말을 다 하네. 친구 좋다는 게 뭐야.`},
    { speaker: 'B', english: `Something smell fishy. Just be yourself`, korean: `뭔가 수상한데. 평소처럼 해.` },
  ],
  representativeExpression: {
    english: "Don't mention it",
    korean: '별말을 다해',
    explanation: `상대방이 감사의 인사를 하면 '천만에요.' '신경 쓰지 마세요.' 라고 응답할 때 사용하는 표현입니다. 유사한 의미로 Forget it. 또는 You're welcome과 같은 표현도 있습니다.`,
  },
};

export default day002;
