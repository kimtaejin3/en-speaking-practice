import { DayData } from '../types';

const day045: DayData = {
  id: 45,
  title:`What brings you here?`,
  conversation: [
    { speaker: 'A', english: `What brings you here?`, korean:`여긴 어쩐 일이세요?` },
    { speaker: 'B', english: `I was in the neighborhood and came by`, korean:`근처에 왔다가 들렀어요.` },
    { speaker: 'A', english: `Great. I'm so glad you came here.`, korean:`잘했어요. 방문해 줘서 기뻐요.` },
    { speaker: 'B', english: `I'm starving. Have you had lunch?`, korean:`배가 많이 고픈데 점심은 드셨어요?` },
    { speaker: 'A', english: `No. Let's go grab a bite to eat.`, korean:`아뇨. 나가서 간단히 뭐 좀 먹죠.` },
    { speaker: 'B', english: `Do you have a favorite hangout around here?`, korean:`근처에 자주 다니시는 데 있나요?` },
  ],
  representativeExpression: {
    english: `What brings you here?`,
    korean: `여기 어쩐 일이야?`,
    explanation: `어떤 장소에서 아는 사람을    `,
  },
};

export default day045;
