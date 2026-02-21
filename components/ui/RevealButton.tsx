'use client';

import { useState } from 'react';

interface RevealButtonProps {
  label?: string;
  children: React.ReactNode;
}

export default function RevealButton({ label = '힌트 보기', children }: RevealButtonProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div>
      {!revealed ? (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="text-sm font-semibold text-accent-blue hover:text-accent-blue-dark transition-colors cursor-pointer"
        >
          {label}
        </button>
      ) : (
        <div className="fade-in text-sm text-text-secondary">{children}</div>
      )}
    </div>
  );
}
