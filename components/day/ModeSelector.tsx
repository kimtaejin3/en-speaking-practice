import Link from 'next/link';
import Card from '@/components/ui/Card';
import { MODE_NAMES, MODE_DESCRIPTIONS, MODE_PATHS } from '@/data/constants';

interface ModeSelectorProps {
  dayId: number;
}

const modeConfig = [
  { key: 'lineGuessing' as const, emoji: '✏️' },
  { key: 'fullConversation' as const, emoji: '💬' },
  { key: 'readAlong' as const, emoji: '📖' },
];

export default function ModeSelector({ dayId }: ModeSelectorProps) {
  return (
    <div className="grid gap-3">
      {modeConfig.map(({ key, emoji }) => (
        <Link key={key} href={`/day/${dayId}/${MODE_PATHS[key]}`}>
          <Card hoverable className="flex items-center gap-3">
            <span className="text-xl">{emoji}</span>
            <div>
              <h3 className="font-bold text-text">{MODE_NAMES[key]}</h3>
              <p className="text-sm text-text-secondary mt-0.5">{MODE_DESCRIPTIONS[key]}</p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
