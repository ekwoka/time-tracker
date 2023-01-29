import { createComputed, createMemo } from 'solid-js';

import { appState } from '@/stores';

import { formatTimer } from '@/utils';

export const TimerDisplay = (props: { value: number; target?: number }) => {
  const timerValue = createMemo(() => {
    if (!props.target || props.target === 0)
      return formatTimer(props.value).split(':');
    if (props.target > props.value)
      return formatTimer(props.target - props.value).split(':');
    return formatTimer(props.value).split(':');
  });

  createComputed(() => (appState.timer = timerValue().join(':')));

  return (
    <span class="text-4xl font-bold tracking-widest font-mono">
      <span class="countdown">
        <span style={`--value: ${timerValue()[0]}`}></span>
        <span class="sr-only">{timerValue()[0]}</span>
      </span>
      :
      <span class="countdown">
        <span style={`--value: ${timerValue()[1]}`}></span>
        <span class="sr-only">{timerValue()[1]}</span>
      </span>
    </span>
  );
};
