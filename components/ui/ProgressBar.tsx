interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  color?: 'primary' | 'success';
}

export default function ProgressBar({ value, max, className = '', color = 'primary' }: ProgressBarProps) {
  const percentage = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  const fillColor = color === 'success' ? 'bg-success' : 'bg-primary';

  return (
    <div className={`w-full ${className}`}>
      <div className="progress-track">
        <div
          className={`progress-fill ${fillColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
