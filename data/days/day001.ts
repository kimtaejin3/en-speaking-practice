import { DayData } from '../types';

const day001: DayData = {
  id: 1,
  title: `Look who's here!`,
  conversation: [
    { speaker: 'A', english: `Ryan! Look who's here!`, korean: `라이언! 이게 대체 누구야?` },
    { speaker: 'B', english: `Good to see you what a small world.`, korean: `반가워. 세상 참 좁구나.` },
    { speaker: 'A', english: `Long time no see. How have you been?`, korean: `오랜만이야. 어떻게 지냈어?` },
    { speaker: 'B', english: `I'm doing great. you haven't changed a bit`, korean: `잘 지내고 있어. 넌 하나도 안 변했구나.` },
    { speaker: 'A', english: `Nice taliking to you. Say hello to your wife`, korean: `대화 즐거웠어. 와이프한테 안부 전해 줘.` },
    { speaker: 'B', english: `Catch you later. I'll keep in touch`, korean: `나중에 봐. 내가 연락할게.` },
  ],
  representativeExpression: {
    english: 'Look who\'s here!',
    korean: '이게 누구야!',
    explanation: '친한 사람을 예상치 못한 장소에서 만났을 때 하는 말입니다. 놀라움과 반가움을 동시에 나타내는 표현이죠. 상황에 따라서 What a surprise! 또는 What\'re you doing here?와 같은 표현이 \'여긴 웬일이야?\'라는 의미로 사용됩니다.',
  },
};

export default day001;
