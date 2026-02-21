import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';

interface OverallProgressProps {
  stats: {
    availableDays: number;
    completedDays: number;
    partialDays: number;
    totalReadCount: number;
    totalCorrect: number;
    totalIncorrect: number;
    accuracy: number;
  };
}

export default function OverallProgress({ stats }: OverallProgressProps) {
  return (
    <Card className="mb-6">
      <h3 className="font-bold mb-4 text-text">전체 학습 현황</h3>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-text-secondary font-medium">완료한 Day</span>
            <span className="font-bold text-text">{stats.completedDays} / {stats.availableDays}</span>
          </div>
          <ProgressBar value={stats.completedDays} max={stats.availableDays} color="success" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-4 bg-primary-light rounded-2xl border-2 border-primary/20">
            <p className="text-3xl font-bold text-primary">{stats.accuracy}%</p>
            <p className="text-xs font-bold text-text-secondary mt-1">정답률</p>
          </div>
          <div className="text-center p-4 bg-accent-yellow/10 rounded-2xl border-2 border-accent-yellow/30">
            <p className="text-3xl font-bold text-accent-orange">{stats.totalReadCount}</p>
            <p className="text-xs font-bold text-text-secondary mt-1">총 읽기 횟수</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-success-light rounded-xl">
            <p className="text-xl font-bold text-success-dark">{stats.completedDays}</p>
            <p className="text-xs font-bold text-text-secondary mt-1">완료</p>
          </div>
          <div className="text-center p-3 bg-accent-blue/10 rounded-xl">
            <p className="text-xl font-bold text-accent-blue">{stats.partialDays}</p>
            <p className="text-xs font-bold text-text-secondary mt-1">진행 중</p>
          </div>
          <div className="text-center p-3 bg-primary-lighter rounded-xl">
            <p className="text-xl font-bold text-primary">{stats.totalCorrect}</p>
            <p className="text-xs font-bold text-text-secondary mt-1">맞춘 문장</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
