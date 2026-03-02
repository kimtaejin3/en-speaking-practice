interface SpeakerBadgeProps {
  speaker: 'A' | 'B';
}

export default function SpeakerBadge({ speaker }: SpeakerBadgeProps) {
  return (
    <span className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
      speaker === 'A'
        ? 'bg-primary-light text-primary border-primary/30'
        : 'bg-accent-blue/10 text-accent-blue border-accent-blue/30'
    }`}>
      {speaker}
    </span>
  );
}
