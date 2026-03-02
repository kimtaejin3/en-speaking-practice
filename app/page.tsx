import Link from 'next/link';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import PageContainer from '@/components/layout/PageContainer';
import Card from '@/components/ui/Card';
import { MODE_NAMES, MODE_DESCRIPTIONS, MODE_PATHS } from '@/data/constants';

const modes = [
  {
    key: 'lineGuessing' as const,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7h16M4 12h10M4 17h12" />
      </svg>
    ),
    color: 'bg-primary-light text-primary',
  },
  {
    key: 'fullConversation' as const,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    color: 'bg-accent-blue/10 text-accent-blue',
  },
  {
    key: 'readAlong' as const,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
    color: 'bg-accent-yellow/20 text-accent-orange',
  },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <BottomNav />
      <PageContainer>
        {/* Book branding hero */}
        <div className="text-center mb-8 pt-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-light mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
              <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-text mb-1">영어회화 100일의 기적</h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            베스트셀러 교재와 함께하는 대화 통암기 학습
          </p>
          <div className="mt-3 inline-block px-3 py-1.5 bg-primary-light rounded-full">
            <span className="text-xs font-bold text-primary-dark">
              📖 책과 함께 매일 1 Day씩 완성하세요
            </span>
          </div>
        </div>

        {/* Mode cards */}
        <h3 className="font-bold text-text mb-3">학습 모드</h3>
        <div className="grid gap-3 mb-6">
          {modes.map((mode) => (
            <Link key={mode.key} href={`/days?mode=${MODE_PATHS[mode.key]}`}>
              <Card hoverable className="flex items-center gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${mode.color}`}>
                  {mode.icon}
                </div>
                <div>
                  <h3 className="font-bold text-text">{MODE_NAMES[mode.key]}</h3>
                  <p className="text-sm text-text-secondary mt-0.5">{MODE_DESCRIPTIONS[mode.key]}</p>
                </div>
              </Card>
            </Link>
          ))}

          <Link href="/random-quiz">
            <Card hoverable className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center bg-accent-orange/10 text-accent-orange">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-text">{MODE_NAMES.randomQuiz}</h3>
                <p className="text-sm text-text-secondary mt-0.5">{MODE_DESCRIPTIONS.randomQuiz}</p>
              </div>
            </Card>
          </Link>
        </div>

        {/* Day selection CTA */}
        <Link href="/days">
          <Card hoverable className="text-center py-6">
            <div className="text-primary font-bold text-lg mb-1">Day 선택하기</div>
            <p className="text-sm text-text-secondary">Day 1~100 중 학습할 Day를 선택하세요</p>
          </Card>
        </Link>

        {/* YouTube link */}
        <a
          href="https://www.youtube.com/watch?v=eSFKOOW6I7Q&list=PLAkBgrW5qY0ROKRZQO-vpJQ6kYdYT5Hss"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-3d btn-3d-secondary flex items-center justify-center gap-2 w-full mt-4 px-5 py-3 text-sm font-bold"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF0000">
            <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          강의 영상 보러가기
        </a>
      </PageContainer>
    </>
  );
}
