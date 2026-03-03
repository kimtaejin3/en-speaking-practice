import { DayData } from '../types';

const day046: DayData = {
  id: 46,
  title:`How did it go?`,
  conversation: [
    { speaker: 'A', english: `When was the last time you got a medical checkup?`, korean:`마지막으로 건강검진 한 게 언제죠?` },
    { speaker: 'B', english: `Two months ago. I get it at my company every year.`, korean:`2개월 전에요. 매년 회사에서 받아요.` },
    { speaker: 'A', english: `How did it go this time?`, korean:`이번에 결과가 어떻게 나왔어요?` },
    { speaker: 'B', english: `Not good. My blood pressure went up a bit.`, korean:`좋진 않아요. 혈압이 조금 올라갔어요.` },
    { speaker: 'A', english: `You've been under a lot of stress lately`, korean:`최근에 스트레스를 많이 받았잖아요.` },
    { speaker: 'B', english: `I should take good care of my health.`, korean:`건강을 더 각별히 돌봐야 겠어요.` },
  ],
  representativeExpression: {
    english: `How did it go?`,
    korean: `어떻게 됐어?`,
    explanation: `동사 go는 '어떤 일이나 상황이 진행되다'라는 의미를 갖고 있죠. '요즘 하는 일 어때?'는 How is it going? 또한. 상황이 어떻게 되어 가는지 물을 때 What's going on?과 같이 표현할 수 있습니다."`,
  },
};

export default day046;
