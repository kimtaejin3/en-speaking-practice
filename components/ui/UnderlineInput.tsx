'use client';

import { forwardRef } from 'react';

interface UnderlineInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  status?: 'default' | 'correct' | 'incorrect';
}

const UnderlineInput = forwardRef<HTMLInputElement, UnderlineInputProps>(
  ({ status = 'default', ...props }, ref) => {
    const statusClass = status === 'correct' ? 'correct' : status === 'incorrect' ? 'incorrect' : '';

    return (
      <input
        ref={ref}
        type="text"
        autoComplete="off"
        className={`underline-input ${statusClass}`}
        {...props}
      />
    );
  }
);

UnderlineInput.displayName = 'UnderlineInput';

export default UnderlineInput;
