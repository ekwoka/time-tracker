import { createMemo } from 'solid-js';

import { formatTimer } from '@/utils';

export const TimerDisplay = (props: { value: number; target?: number }) => {
  const timerValue = createMemo(() => {
    if (!props.target || props.target === 0) return props.value;
    if (props.target > props.value) return props.target - props.value;
    return props.value;
  });

  return (
    <span class="text-4xl font-bold tracking-widest font-mono">
      {formatTimer(timerValue())}
    </span>
  );
};
